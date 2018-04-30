import {AnyThunkAction, ThunkAction, ThunkType} from 'redux-dutiful-thunk';
import {BookmarkById, SearchCondition, UnixTime} from './lib/models';
import {State} from './state';
import {ThunkContext} from './thunk-ctx';

export type Action =
  | AnyThunkAction
  | {type: 'PING'; name: string}
  | {type: 'CATCH_ERR'; err: Error}
  | {type: 'SYNC_BOOKMARKS_START'}
  | {type: 'SYNC_BOOKMARKS_SUCCESS'; bookmarks: BookmarkById}
  | {type: 'SEARCH'; condition: Partial<SearchCondition>}
  | {type: 'UPDATE_SHOWN_BOOKMARKS'; ids: string[]}
  | {type: 'LOAD_MORE_BOOKMARKS_START'}
  | {type: 'LOAD_MORE_BOOKMARKS_SUCCESS'; bookmarks: BookmarkById; isLast: boolean}
  | {type: 'OPEN_BOOKMARK'; id: string}
  | {type: 'RESET_OPEN_BOOKMARK'; id: string}
  | {type: 'FAVORITE_BOOKMARK_START'; id: string}
  | {type: 'FAVORITE_BOOKMARK_SUCCESS'; id: string; favoritedAt: UnixTime}
  | {type: 'UNFAVORITE_BOOKMARK_START'; id: string}
  | {type: 'UNFAVORITE_BOOKMARK_SUCCESS'; id: string}
  | {type: 'CLEAR_QUERY_COUNT_CACHES'};

export type Thunk<R = void, T extends ThunkType = any> = ThunkAction<
  State,
  Action,
  ThunkContext,
  R,
  T
>;
