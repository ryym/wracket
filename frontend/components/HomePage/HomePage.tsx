import React from 'react';
import {connect} from 'react-redux';
import {State} from '../../state';
import {Dispatch} from '../../store';
import {syncBookmarks, search, openBookmark, resetOpenBookmark} from '../../store/actions';
import {listBookmarks, getSearchCondition} from '../../store/selectors';
import {BookmarkList} from '../BookmarkList';
import {BookmarkFilter} from '../BookmarkFilter';
import {Bookmark, BookmarkStatus, SearchCondition} from '../../lib/models';

export interface Props {
  bookmarks: Bookmark[];
  nowLoading: boolean;
  condition: SearchCondition;
}
export type AllProps = Props & {dispatch: Dispatch};

export class _HomePage extends React.Component<AllProps> {
  search = (cdtn: Partial<SearchCondition>) => {
    this.props.dispatch(search(cdtn));
  };

  markBookmarkAsOpen = (b: Bookmark) => {
    this.props.dispatch(openBookmark(b.id));
  };

  backBookmarkToUnread = (b: Bookmark) => {
    this.props.dispatch(resetOpenBookmark(b.id));
  };

  render() {
    const {props} = this;
    const {dispatch} = props;
    return (
      <div>
        <button onClick={() => dispatch(syncBookmarks())}>Sync</button>
        <BookmarkFilter condition={props.condition} onConditionChange={this.search} />
        {props.nowLoading && 'Now loading...'}
        <BookmarkList
          bookmarks={props.bookmarks}
          onBookmarkOpen={this.markBookmarkAsOpen}
          onBackToUnread={this.backBookmarkToUnread}
        />
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
