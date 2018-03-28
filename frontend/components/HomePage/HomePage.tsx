import React from 'react';
import {connect} from 'react-redux';
import {State} from '../../state';
import {Dispatch} from '../../store';
import {ping} from '../../store/actions';
import {listBookmarks} from '../../store/selectors';
import {BookmarkList} from '../BookmarkList';
import {Bookmark} from '../../lib/models';

export interface Props {
  bookmarks: Bookmark[];
}
export type AllProps = Props & {dispatch: Dispatch};

export class _HomePage extends React.Component<AllProps> {
  render() {
    const {dispatch, bookmarks} = this.props;
    return (
      <div>
        <button onClick={() => dispatch(ping('home'))}>Ping</button>
        <BookmarkList bookmarks={bookmarks} />
      </div>
    );
  }
}

export const HomePage = connect((state: State): Props => {
  return {
    bookmarks: listBookmarks(state),
  };
})(_HomePage);
