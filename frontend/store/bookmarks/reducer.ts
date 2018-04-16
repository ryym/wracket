import {Bookmark, BookmarkStatus} from '../../lib/models';
import {BookmarkState, newBookmarkState} from '../../state';
import {Action} from '../../action';

export function reduceBookmarks(
  bks: BookmarkState = newBookmarkState(),
  action: Action,
): BookmarkState {
  switch (action.type) {
    case 'SYNC_BOOKMARKS_START':
    case 'SEARCH_START':
      return {
        ...bks,
        nowLoading: true,
      };

    case 'SYNC_BOOKMARKS_SUCCESS':
      return {
        ...action.bookmarks,
        nowLoading: false,
      };

    case 'SEARCH_SUCCESS':
      return {
        ids: action.bookmarks.ids,
        byId: {
          ...bks.byId,
          ...action.bookmarks.byId,
        },
        nowLoading: false,
      };

    case 'OPEN_BOOKMARK': {
      const b = bks.byId[action.id]!;
      return {
        ...bks,
        byId: {
          ...bks.byId,
          [b.id]: markAsOpen(b),
        },
      };
    }

    default:
      return bks;
  }
}

const markAsOpen = (b: Bookmark): Bookmark =>
  b.status === BookmarkStatus.Reading
    ? b
    : {
        ...b,
        status: BookmarkStatus.Reading,
      };
