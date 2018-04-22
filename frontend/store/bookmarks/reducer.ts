import {Bookmark, BookmarkStatus} from '../../lib/models';
import {updateObj} from '../../lib/obj';
import {BookmarkState, newBookmarkState} from '../../state';
import {Action} from '../../action';

export function reduceBookmarks(
  bks: BookmarkState = newBookmarkState(),
  action: Action,
): BookmarkState {
  switch (action.type) {
    case 'SYNC_BOOKMARKS_START':
    case 'LOAD_MORE_BOOKMARKS_START':
      return {
        ...bks,
        nowLoading: true,
      };

    case 'SYNC_BOOKMARKS_SUCCESS':
      return {
        ...bks,
        byId: action.bookmarks,
        nowLoading: false,
      };

    case 'LOAD_MORE_BOOKMARKS_SUCCESS': {
      const isEmpty = Object.keys(action.bookmarks).length === 0;
      return {
        ...bks,
        byId: isEmpty ? bks.byId : {...bks.byId, ...action.bookmarks},
        nowLoading: false,
      };
    }

    case 'UPDATE_SHOWN_BOOKMARKS':
      return {
        ...bks,
        shownIds: action.ids,
      };

    case 'OPEN_BOOKMARK': {
      const b = bks.byId[action.id]!;
      return {
        ...bks,
        byId: updateObj(bks.byId, String(b.id), changeStatus(BookmarkStatus.Reading)),
      };
    }

    case 'RESET_OPEN_BOOKMARK': {
      const b = bks.byId[action.id]!;
      return {
        ...bks,
        byId: updateObj(bks.byId, String(b.id), changeStatus(BookmarkStatus.Unread)),
      };
    }

    default:
      return bks;
  }
}

const changeStatus = (status: BookmarkStatus) => (b: Bookmark): Bookmark =>
  b.status === status ? b : {...b, status};
