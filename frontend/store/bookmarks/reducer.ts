import {BookmarkState} from '../../state';
import {Action} from '../../action';

const init: BookmarkState = {
  ids: [],
  byId: {},
  nowLoading: false,
};

export function reduceBookmarks(bks: BookmarkState = init, action: Action): BookmarkState {
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
