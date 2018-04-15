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

    default:
      return bks;
  }
}
