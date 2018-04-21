import {thunk} from 'redux-dutiful-thunk';
import {Action, Thunk} from '../../action';
import {SearchCondition} from '../../lib/models';
import {getSearchCondition} from '../selectors';

export function syncBookmarks(): Thunk {
  return thunk(async (dispatch, getState, {api}) => {
    dispatch({type: 'SYNC_BOOKMARKS_START'});

    const cdtn = getSearchCondition(getState());
    const bookmarks = await api.synchronize(cdtn);

    if (bookmarks) {
      dispatch({
        type: 'SYNC_BOOKMARKS_SUCCESS',
        bookmarks,
      });
    }
  });
}

export function search(condition: Partial<SearchCondition>): Action {
  return {type: 'SEARCH', condition};
}

export function openBookmark(id: number): Thunk {
  return thunk(async (dispatch, getState, {api}) => {
    dispatch({type: 'OPEN_BOOKMARK', id});
    api.openBookmark(id);
  });
}

export function resetOpenBookmark(id: number): Thunk {
  return thunk(async (dispatch, getState, {api}) => {
    dispatch({type: 'RESET_OPEN_BOOKMARK', id});
    api.resetOpenBookmark(id);
  });
}
