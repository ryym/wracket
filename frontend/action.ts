import {Action as ReduxAction} from 'redux';
import {AnyThunkAction, ThunkAction, ThunkType} from 'redux-dutiful-thunk';
import {BookmarkById, SearchCondition} from './lib/models';
import {State} from './state';

export type ErrorAction = {
  type: any;
  err: Error;
};

// If you want to clean up some invalid state because of an error,
// dispatch this action explicitly to:
// - tell reducers that an error occurred
// - display its error message to user
type Err<A extends ReduxAction> = A & {err: Error};

export type Action =
  | AnyThunkAction
  | {type: 'PING'; name: string}
  | {type: 'CATCH_ERR'; caught: Error}
  | {type: 'SYNC_BOOKMARKS_START'}
  | {type: 'SYNC_BOOKMARKS_OK'; bookmarks: BookmarkById}
  | {type: 'SEARCH'; condition: Partial<SearchCondition>}
  | {type: 'UPDATE_SHOWN_BOOKMARKS'; ids: string[]}
  | {type: 'LOAD_MORE_BOOKMARKS_START'}
  | {type: 'LOAD_MORE_BOOKMARKS_OK'; bookmarks: BookmarkById; isLast: boolean}
  | {type: 'OPEN_BOOKMARK'; id: string}
  | {type: 'RESET_OPEN_BOOKMARK'; id: string}
  | {type: 'FAVORITE_BOOKMARK_START'; id: string}
  | Err<{type: 'FAVORITE_BOOKMARK_ERR'; id: string}>
  | {type: 'UNFAVORITE_BOOKMARK_START'; id: string}
  | Err<{type: 'UNFAVORITE_BOOKMARK_ERR'; id: string}>
  | {type: 'CLEAR_QUERY_COUNT_CACHES'}
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
