import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../state';

import {Dispatch} from '../../store';
import {
  search,
  initShownBookmarks,
  loadMoreBookmarks,
  openBookmark,
  resetOpenBookmark,
  favoriteBookmark,
  unfavoriteBookmark,
  archiveBookmark,
  readdBookmark,
  deleteBookmark,
  toggleSearchPanelCollapsibility,
} from '../../store/actions';
import {
  listBookmarks,
  getSearchCondition,
  canLoadMore,
  isSearchPanelCollapsible,
} from '../../store/selectors';
import {Bookmark, BookmarkStatus, SearchCondition} from '../../lib/models';
import {BookmarkList} from '../BookmarkList';
import {BookmarkFilter} from '../BookmarkFilter';
import {ConnectedTopAppBar as TopAppBar} from '../TopAppBar/connected';

const cls = require('./HomePage_styles.scss');

const MIN_DISPLAY_COUNT = 30;

export interface Props {
  bookmarks: Bookmark[];
  nowLoading: boolean;
  canLoadMore: boolean;
  condition: SearchCondition;
  searchPanelCollapsible: boolean;
}
export type AllProps = Props & {dispatch: Dispatch};

export class _HomePage extends React.PureComponent<AllProps> {
  search = (cdtn: Partial<SearchCondition>) => {
    this.props.dispatch(search(cdtn));
  };

  markBookmarkAsOpen = (b: Bookmark) => {
    if (b.status !== BookmarkStatus.Archived) {
      this.props.dispatch(openBookmark(b.id));
    }
  };

  backBookmarkToUnread = (b: Bookmark) => {
    this.props.dispatch(resetOpenBookmark(b.id));
  };

  toggleFavorite = (b: Bookmark, favorite: boolean) => {
    const action = favorite ? favoriteBookmark(b.id) : unfavoriteBookmark(b.id);
    this.props.dispatch(action);
  };

  archiveBookmark = (b: Bookmark) => {
    this.props.dispatch(archiveBookmark(b.id));
  };

  readdBookmark = (b: Bookmark) => {
    this.props.dispatch(readdBookmark(b.id));
  };

  deleteBookmark = (b: Bookmark) => {
    this.props.dispatch(deleteBookmark(b.id));
  };

  closeSearchPanel = () => {
    this.props.dispatch(toggleSearchPanelCollapsibility(true));
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(initShownBookmarks());
  }

  componentDidUpdate(prev: AllProps) {
    const {bookmarks} = this.props;
    if (prev.bookmarks !== bookmarks && bookmarks.length < MIN_DISPLAY_COUNT) {
      this.loadMoreBookmarks();
    }
  }

  loadMoreBookmarks = () => {
    this.props.dispatch(loadMoreBookmarks());
  };

  render() {
    const {props} = this;
    const {searchPanelCollapsible} = props;
    const canLoadMore = props.canLoadMore && !props.nowLoading;
    return (
      <div>
        <TopAppBar />
        <main className={cls.mainContainer}>
          <BookmarkList
            className={cls.bookmarkList}
            bookmarks={props.bookmarks}
            onBookmarkOpen={this.markBookmarkAsOpen}
            onBackToUnread={this.backBookmarkToUnread}
            onFavoriteToggle={this.toggleFavorite}
            onArchiveClick={this.archiveBookmark}
            onReaddClick={this.readdBookmark}
            onDeleteClick={this.deleteBookmark}
            onLoadMoreClick={canLoadMore ? this.loadMoreBookmarks : undefined}
          />
          <BookmarkFilter
            className={cls.bookmarkFilter}
            collapsible={searchPanelCollapsible}
            condition={props.condition}
            onConditionChange={this.search}
            onOverlayClick={this.closeSearchPanel}
          />
        </main>
      </div>
    );
  }
}

export const HomePage = connect((state: State): Props => {
  return {
    bookmarks: listBookmarks(state),
    nowLoading: state.bookmarks.nowLoading,
    canLoadMore: canLoadMore(state),
    condition: getSearchCondition(state),
    searchPanelCollapsible: isSearchPanelCollapsible(state),
  };
})(_HomePage);
