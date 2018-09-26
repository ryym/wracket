import {createStore, applyMiddleware, Store as ReduxStore, Dispatch as ReduxDispatch} from 'redux';
import logger from 'redux-logger';
import {createThunkMiddleware} from 'redux-dutiful-thunk';
import {IS_DEVELOPMENT} from '../consts';
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

const getMiddlewares = (isDev = IS_DEVELOPMENT) => {
  const common = [errorCatchMiddleware(), enableBookmarkSearch(), createThunkMiddleware()];
  return isDev ? [logger, ...common] : common;
};

export function configureStore(conf: StoreConfig): Store {
  return createStore<State, Action, {}, {}>(
    rootReducer,
    conf.initialState || {},
    applyMiddleware(...getMiddlewares()),
  );
}
