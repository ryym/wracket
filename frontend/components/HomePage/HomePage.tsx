import React from 'react';
import {connect} from 'react-redux';
import {State} from '../../state';
import {Dispatch} from '../../store';
import {syncBookmarks} from '../../store/actions';
import {listBookmarks} from '../../store/selectors';
import {BookmarkList} from '../BookmarkList';
import {Bookmark} from '../../lib/models';

export interface Props {
  bookmarks: Bookmark[];
  nowLoading: boolean;
}
export type AllProps = Props & {dispatch: Dispatch};

export class _HomePage extends React.Component<AllProps> {
  render() {
    const {props} = this;
    const {dispatch} = props;
    return (
      <div>
        <button onClick={() => dispatch(syncBookmarks())}>Sync</button>
        {props.nowLoading && 'Now loading...'}
        <BookmarkList bookmarks={props.bookmarks} />
      </div>
    );
  }
}

export const HomePage = connect((state: State): Props => {
  return {
    bookmarks: listBookmarks(state),
    nowLoading: state.bookmarks.nowLoading,
  };
})(_HomePage);
