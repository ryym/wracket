import {State} from '../../state';
import {memoize} from '../../lib/selector-memoizer';
import {Bookmark, BookmarkById} from '../../lib/models';

export const listBookmarks = memoize(
  ({bookmarks}: State) => ({ids: bookmarks.shownIds}),
  ({bookmarks}, {ids}) => bookmarks.shownIds.map(id => bookmarks.byId[id]!),
);

export const getLastBookmark = ({bookmarks: {shownIds, byId}}: State): Bookmark | null => {
  if (shownIds.length === 0) {
    return null;
  }
  const lastId = shownIds[shownIds.length - 1];
  return byId[lastId];
};

export const getBookmarksById = ({bookmarks}: State): BookmarkById => {
  return bookmarks.byId;
};
