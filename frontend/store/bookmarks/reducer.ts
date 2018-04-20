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
        byId: action.bookmarks,
        nowLoading: false,
      };

    case 'SEARCH_SUCCESS':
      return {
        byId: {
          ...bks.byId,
          ...action.bookmarks,
        },
        nowLoading: false,
      };

    case 'OPEN_BOOKMARK': {
      const b = bks.byId[action.id]!;
      return {
        ...bks,
        byId: {
          ...bks.byId,
          [b.id]: changeStatus(b, BookmarkStatus.Reading),
        },
      };
    }

    case 'RESET_OPEN_BOOKMARK': {
      const b = bks.byId[action.id]!;
      return {
        ...bks,
        byId: {
          ...bks.byId,
          [b.id]: changeStatus(b, BookmarkStatus.Unread),
        },
      };
    }

    default:
      return bks;
  }
}

const changeStatus = (b: Bookmark, status: BookmarkStatus): Bookmark =>
  b.status === status ? b : {...b, status};
