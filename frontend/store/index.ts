import {createStore, applyMiddleware, Store as ReduxStore, Dispatch as ReduxDispatch} from 'redux';
import logger from 'redux-logger';
import {createThunkMiddleware} from 'redux-dutiful-thunk';
import {State} from '../state';
import {Action} from '../action';
import {rootReducer} from './reducer';
import {errorCatchMiddleware} from './middlewares';
import {enableBookmarkSearch} from './bookmarks/middlewares';

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<State, Action>;

export type StoreConfig = {
  initialState?: Partial<State>;
};

export function configureStore(conf: StoreConfig): Store {
  return createStore<State, Action, {}, {}>(
    rootReducer,
    conf.initialState || {},
    applyMiddleware(
      logger,
      errorCatchMiddleware(),
      enableBookmarkSearch(),
      createThunkMiddleware(),
    ),
  );
}
