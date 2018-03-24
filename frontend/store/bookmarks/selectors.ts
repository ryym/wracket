import {State} from '../../state';
import {Bookmark} from '../../lib/models';

export const listBookmarks = ({bookmarks}: State): Bookmark[] => {
  return bookmarks.ids.map(id => bookmarks.byId[id]!);
};
