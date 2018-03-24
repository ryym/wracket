import {createStore, applyMiddleware, Store as ReduxStore, Dispatch as ReduxDispatch} from 'redux';
import logger from 'redux-logger';
import {createThunkMiddleware} from 'redux-dutiful-thunk';
import {State} from '../state';
import {Action} from '../action';
import {rootReducer} from './reducer';

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<State, Action>;

export type StoreConfig = {
  initialState?: State;
};

export function configureStore(conf: StoreConfig = {}): Store {
  return createStore(
    rootReducer,
    conf.initialState || {},
    applyMiddleware(logger, createThunkMiddleware()),
  );
}
