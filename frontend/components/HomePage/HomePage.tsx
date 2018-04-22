import React from 'react';
import {connect} from 'react-redux';
import {State} from '../../state';
import {Dispatch} from '../../store';
import {
  syncBookmarks,
  search,
  loadMoreBookmarks,
  openBookmark,
  resetOpenBookmark,
} from '../../store/actions';
import {listBookmarks, getSearchCondition} from '../../store/selectors';
import {BookmarkList} from '../BookmarkList';
import {BookmarkFilter} from '../BookmarkFilter';
import {Bookmark, BookmarkStatus, SearchCondition} from '../../lib/models';

const MIN_DISPLAY_COUNT = 30;

export interface Props {
  bookmarks: Bookmark[];
  nowLoading: boolean;
  condition: SearchCondition;
}
export type AllProps = Props & {dispatch: Dispatch};

export class _HomePage extends React.PureComponent<AllProps> {
  search = (cdtn: Partial<SearchCondition>) => {
    this.props.dispatch(search(cdtn));
  };

  markBookmarkAsOpen = (b: Bookmark) => {
    this.props.dispatch(openBookmark(b.id));
  };

  backBookmarkToUnread = (b: Bookmark) => {
    this.props.dispatch(resetOpenBookmark(b.id));
  };

  componentDidMount() {
    const {bookmarks, dispatch} = this.props;
  }

  componentDidUpdate(prev: AllProps) {
    const {bookmarks, dispatch} = this.props;
    if (prev.bookmarks === bookmarks) {
      return;
    }
    if (bookmarks.length < MIN_DISPLAY_COUNT) {
      dispatch(loadMoreBookmarks(bookmarks.length));
    }
  }

  render() {
    const {props} = this;
    const {dispatch} = props;
    return (
      <div>
        <button onClick={() => dispatch(syncBookmarks())}>Sync</button>
        <BookmarkFilter condition={props.condition} onConditionChange={this.search} />
        <BookmarkList
          bookmarks={props.bookmarks}
          onBookmarkOpen={this.markBookmarkAsOpen}
          onBackToUnread={this.backBookmarkToUnread}
        />
        {props.nowLoading && 'Now loading...'}
      </div>
    );
  }
}

export const HomePage = connect((state: State): Props => {
  return {
    bookmarks: listBookmarks(state),
    nowLoading: state.bookmarks.nowLoading,
    condition: getSearchCondition(state),
  };
})(_HomePage);
