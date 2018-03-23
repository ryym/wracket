import {createStore, applyMiddleware, Store as ReduxStore, Dispatch as ReduxDispatch} from 'redux';
import logger from 'redux-logger';
import {createThunkMiddleware} from 'redux-dutiful-thunk';
import {State} from '../state';
import {Action} from '../action';
import {rootReducer} from './reducer';

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<State, Action>;

export function configureStore(): Store {
  return createStore(rootReducer, applyMiddleware(logger, createThunkMiddleware()));
}
