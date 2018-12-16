import {Reducer, combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {History} from 'history';
import {State} from '../state';
import {Action} from '../action';
import {reduceUser} from './user/reducer';
import {reduceBookmarks} from './bookmarks/reducer';
import {reduceSearch} from './search/reducer';
import {reduceErrors} from './errors/reducer';

export const createReducer = (history: History): Reducer<State, Action> => {
  return combineReducers<State>({
    router: connectRouter(history),
    user: reduceUser,
    bookmarks: reduceBookmarks,
    search: reduceSearch,
    errors: reduceErrors,
  });
};
