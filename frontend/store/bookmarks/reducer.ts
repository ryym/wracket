import {Bookmark, BookmarkStatus} from '../../lib/models';
import {BookmarkState, newBookmarkState} from '../../state';
import {Action} from '../../action';

export function reduceBookmarks(
  bks: BookmarkState = newBookmarkState(),
  action: Action,
): BookmarkState {
  switch (action.type) {
    case 'SYNC_BOOKMARKS_START':
      return {
        ...bks,
        nowLoading: true,
      };

    case 'SYNC_BOOKMARKS_SUCCESS':
      return {
        byId: action.bookmarks,
        nowLoading: false,
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

const updateObj = <O extends {}, K extends keyof O>(
  obj: O,
  key: K,
  update: (v: O[K]) => O[K],
): O => {
  const cur = obj[key];
  const next = update(cur);
  // https://github.com/Microsoft/TypeScript/issues/13557
  return cur === next ? obj : {...(obj as any), [key]: next};
};
