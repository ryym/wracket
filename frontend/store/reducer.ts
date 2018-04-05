import {Reducer, combineReducers} from 'redux';
import {State} from '../state';
import {Action} from '../action';
import {reduceBookmarks} from './bookmarks/reducer';
import {reduceCondition} from './condition/reducer';

export const rootReducer: Reducer<State, Action> = combineReducers<State>({
  bookmarks: reduceBookmarks,
  searchCondition: reduceCondition,
});
