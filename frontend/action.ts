import {AnyThunkAction, ThunkAction, ThunkType} from 'redux-dutiful-thunk';
import {RouterAction} from 'connected-react-router';
import {BookmarkById, BookmarkStatus, SearchCondition, SyncStatus} from './lib/models';
import {State} from './state';

export type ErrorAction = {
  type: any;
  err: Error;
};

// If you want to clean up some invalid state because of an error,
// dispatch the error as an action explicitly to:
// - tell reducers that an error occurred
// - display its error message to user
type Err = {err: Error};

export type Action =
  | AnyThunkAction
  | RouterAction
  | {type: 'PING'; name: string}
  | {type: 'CATCH_ERR'; caught: Error}
  | {type: 'SYNC_BOOKMARKS_START'}
  | {type: 'SYNC_BOOKMARKS_OK'; bookmarks: BookmarkById}
  | {type: 'SEARCH'; condition: SearchCondition; query: string}
  | {type: 'UPDATE_SHOWN_BOOKMARKS'; ids: string[]}
  | {type: 'LOAD_MORE_BOOKMARKS_START'}
  | {
      type: 'LOAD_MORE_BOOKMARKS_OK';
      bookmarks: BookmarkById;
      isLast: boolean;
      syncStatus: SyncStatus;
    }
  | {type: 'OPEN_BOOKMARK'; id: string}
  | {type: 'RESET_OPEN_BOOKMARK'; id: string}
  | {type: 'FAVORITE_BOOKMARK_START'; id: string}
  | {type: 'FAVORITE_BOOKMARK_ERR'; id: string} & Err
  | {type: 'UNFAVORITE_BOOKMARK_START'; id: string}
  | {type: 'UNFAVORITE_BOOKMARK_ERR'; id: string} & Err
  | {type: 'ARCHIVE_BOOKMARK_START'; id: string}
  | {type: 'ARCHIVE_BOOKMARK_ERR'; id: string; prevStatus: BookmarkStatus} & Err
  | {type: 'READD_BOOKMARK_START'; id: string}
  | {type: 'READD_BOOKMARK_ERR'; id: string} & Err
  | {type: 'DELETE_BOOKMARK_START'; id: string}
  | {type: 'DELETE_BOOKMARK_ERR'; id: string; prevStatus: BookmarkStatus} & Err
  | {type: 'TOGGLE_SEARCH_PANEL_COLLAPSIBILITY'; enabled: boolean};

export function isErrorAction(action: Action): action is ErrorAction {
  return 'err' in action;
}

export type Thunk<R = void, T extends ThunkType = any> = ThunkAction<
  State,
  Action,
  undefined,
  R,
  T
>;
