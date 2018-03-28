import {AnyThunkAction, ThunkAction, ThunkType} from 'redux-dutiful-thunk';
import {State} from './state';
import {ThunkContext} from './thunk-ctx';

export type Action = AnyThunkAction | {type: 'INCR'};

export type Thunk<R = void, T extends ThunkType = null> = ThunkAction<
  State,
  Action,
  ThunkContext,
  T,
  R
>;
