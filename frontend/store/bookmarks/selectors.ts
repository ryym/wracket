import {State} from '../../state';
import {Bookmark, BookmarkById} from '../../lib/models';

export const listBookmarks = ({bookmarks}: State): Bookmark[] => {
  return bookmarks.shownIds.map(id => bookmarks.byId[id]!);
};

export const getBookmarksById = ({bookmarks}: State): BookmarkById => {
  return bookmarks.byId;
};
