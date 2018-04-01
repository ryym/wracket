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
      return {
        ...bks,
        nowLoading: true,
      };
    case 'SYNC_BOOKMARKS_SUCCESS':
      return {
        ...action.bookmarks,
        nowLoading: false,
      };
    default:
      return bks;
  }
}
