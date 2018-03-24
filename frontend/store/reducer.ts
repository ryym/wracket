import {Reducer, combineReducers} from 'redux';
import {State} from '../state';
import {Action} from '../action';
import {reduceCounter} from './counter/reducer';
import {reduceBookmarks} from './bookmarks/reducer';

export const rootReducer: Reducer<State, Action> = combineReducers<State>({
  counter: reduceCounter,
  bookmarks: reduceBookmarks,
});
