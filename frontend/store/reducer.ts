import {Reducer, combineReducers} from 'redux';
import {State} from '../state';
import {Action} from '../action';
import {reduceBookmarks} from './bookmarks/reducer';
import {reduceSearch} from './search/reducer';

export const rootReducer: Reducer<State, Action> = combineReducers<State>({
  bookmarks: reduceBookmarks,
  search: reduceSearch,
});
