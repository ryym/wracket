import {AnyThunkAction, ThunkAction, ThunkType} from 'redux-dutiful-thunk';
import {Bookmarks, SearchCondition} from './lib/models';
import {State} from './state';
import {ThunkContext} from './thunk-ctx';

export type Action =
  | AnyThunkAction
  | {type: 'PING'; name: string}
  | {type: 'SYNC_BOOKMARKS_START'}
  | {type: 'SYNC_BOOKMARKS_SUCCESS'; bookmarks: Bookmarks}
  | {type: 'SEARCH_START'}
  | {type: 'SEARCH_SUCCESS'; bookmarks: Bookmarks; condition: SearchCondition};

export type Thunk<R = void, T extends ThunkType = null> = ThunkAction<
  State,
  Action,
  ThunkContext,
  R,
  T
>;
