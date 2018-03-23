import {AnyThunkAction, ThunkAction, ThunkType} from 'redux-dutiful-thunk';
import {State} from './state';

export type Action = AnyThunkAction | {type: 'INCR'};

export type Thunk<R = void, T extends ThunkType = null> = ThunkAction<
  State,
  Action,
  {},
  T,
  R
>;
