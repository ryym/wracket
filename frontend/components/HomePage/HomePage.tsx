import React from 'react';
import {connect} from 'react-redux';
import {State} from '../../state';
import {Dispatch} from '../../store';
import {
  syncBookmarks,
  search,
  initShownBookmarks,
  loadMoreBookmarks,
  openBookmark,
  resetOpenBookmark,
  favoriteBookmark,
  unfavoriteBookmark,
} from '../../store/actions';
import {listBookmarks, getSearchCondition, canLoadMore} from '../../store/selectors';
import {BookmarkList} from '../BookmarkList';
import {BookmarkFilter} from '../BookmarkFilter';
import {Bookmark, BookmarkStatus, SearchCondition} from '../../lib/models';

const MIN_DISPLAY_COUNT = 30;

export interface Props {
  bookmarks: Bookmark[];
  nowLoading: boolean;
  canLoadMore: boolean;
  condition: SearchCondition;
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
    const {dispatch} = props;
    return (
      <div className="home-page">
        <button onClick={() => dispatch(syncBookmarks())}>Sync</button>
        <BookmarkFilter condition={props.condition} onConditionChange={this.search} />
        <BookmarkList
          bookmarks={props.bookmarks}
          onBookmarkOpen={this.markBookmarkAsOpen}
          onBackToUnread={this.backBookmarkToUnread}
          onFavoriteToggle={this.toggleFavorite}
        />
        {/* TODO: Load more automatically on scroll. */}
        {props.canLoadMore && (
          <button type="button" onClick={this.loadMoreBookmarks}>
            Load more
          </button>
        )}
        {props.nowLoading && 'Now loading...'}
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
  };
})(_HomePage);
