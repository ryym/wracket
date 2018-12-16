import {createStore, applyMiddleware, Store as ReduxStore, Dispatch as ReduxDispatch} from 'redux';
import logger from 'redux-logger';
import {createThunkMiddleware} from 'redux-dutiful-thunk';
import {History} from 'history';
import {routerMiddleware} from 'connected-react-router';
import {IS_DEVELOPMENT} from '../consts';
import {State} from '../state';
import {Action} from '../action';
import {createReducer} from './reducer';
import {errorCatchMiddleware} from './middlewares';
import {enableBookmarkSearch} from './bookmarks/middlewares';

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<State, Action>;

export type StoreConfig = {
  initialState?: Partial<State>;
  history: History;
};

const getMiddlewares = (history: History, isDev = IS_DEVELOPMENT) => {
  const common = [
    errorCatchMiddleware(),
    enableBookmarkSearch(),
    createThunkMiddleware(),
    routerMiddleware(history),
  ];
  return isDev ? [logger, ...common] : common;
};

export function configureStore(conf: StoreConfig): Store {
  return createStore<State, Action, {}, {}>(
    createReducer(conf.history),
    conf.initialState || {},
    applyMiddleware(...getMiddlewares(conf.history)),
  );
}
