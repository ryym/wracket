import {Dispatch, Middleware} from 'redux';
import {isThunkAction} from 'redux-dutiful-thunk';
import {State} from '../../state';
import {Action} from '../../action';
import {getSearchCondition, getBookmarksById} from '../selectors';
import {updateShownBookmarks} from './actions';

export function enableBookmarkSearch(): Middleware<{}, State, Dispatch<Action>> {
  return ({dispatch, getState}) => next => action => {
    if (isThunkAction(action) || action.type === 'UPDATE_SHOWN_BOOKMARKS') {
      return next(action);
    }

    const prev = getState();
    const result = next(action);
    const state = getState();

    const conditionChanged = getSearchCondition(prev) !== getSearchCondition(state);
    const dataChanged = getBookmarksById(prev) !== getBookmarksById(state);

    if (conditionChanged || dataChanged) {
      dispatch(updateShownBookmarks({conditionChangeOnly: !dataChanged}));
    }
    return result;
  };
}
