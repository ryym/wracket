import {AnyThunkAction, ThunkAction, ThunkType} from 'redux-dutiful-thunk';
import {BookmarkById, SearchCondition} from './lib/models';
import {State} from './state';
import {ThunkContext} from './thunk-ctx';

export type Action =
  | AnyThunkAction
  | {type: 'PING'; name: string}
  | {type: 'SYNC_BOOKMARKS_START'}
  | {type: 'SYNC_BOOKMARKS_SUCCESS'; bookmarks: BookmarkById}
  | {type: 'SEARCH'; condition: Partial<SearchCondition>}
  | {type: 'LOAD_MORE_BOOKMARKS_START'}
  | {type: 'LOAD_MORE_BOOKMARKS_SUCCESS'; bookmarks: BookmarkById}
  | {type: 'OPEN_BOOKMARK'; id: string}
  | {type: 'RESET_OPEN_BOOKMARK'; id: string}
  | {type: 'UPDATE_QUERY_COUNT'; count: number};

export type Thunk<R = void, T extends ThunkType = any> = ThunkAction<
  State,
  Action,
  ThunkContext,
  R,
  T
>;
