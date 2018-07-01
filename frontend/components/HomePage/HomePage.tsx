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
          />
          <BookmarkFilter
            className={cls.bookmarkFilter}
            collapsible={searchPanelCollapsible}
            condition={props.condition}
            onConditionChange={this.search}
          />
        </main>
        {/* TODO: Load more automatically on scroll. */}
        {props.canLoadMore &&
          !props.nowLoading && (
            <button type="button" onClick={this.loadMoreBookmarks}>
              Load more
            </button>
          )}
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
