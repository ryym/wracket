import {Reducer, combineReducers} from 'redux';
import {State} from '../state';
import {Action} from '../action';
import {reduceUser} from './user/reducer';
import {reduceBookmarks} from './bookmarks/reducer';
import {reduceSearch} from './search/reducer';
import {reduceErrors} from './errors/reducer';

export const rootReducer: Reducer<State, Action> = combineReducers<State>({
  user: reduceUser,
  bookmarks: reduceBookmarks,
  search: reduceSearch,
  errors: reduceErrors,
});
