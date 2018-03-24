import React from 'react';
import {connect} from 'react-redux';
import {State} from '../../state';
import {Dispatch} from '../../store';
import {listBookmarks} from '../../store/selectors';
import {BookmarkList} from '../BookmarkList';
import {Bookmark} from '../../lib/models';

export interface Props {
  bookmarks: Bookmark[];
}
export type AllProps = Props & {dispatch: Dispatch};

export class _HomePage extends React.Component<AllProps> {
  render() {
    const {props} = this;
    return <BookmarkList bookmarks={props.bookmarks} />;
  }
}

export const HomePage = connect((state: State): Props => {
  return {
    bookmarks: listBookmarks(state),
  };
})(_HomePage);
