import {thunk, thunkAs} from 'redux-dutiful-thunk';
import {Action, Thunk} from '../../action';
import {SearchCondition} from '../../lib/models';
import {listBookmarks, getSearchCondition, getCurrentQueryState} from '../selectors';

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

// Flow:
//   1. Render a component with current bookmarks.
//   2. This action is called on the component update (when bookmarks changed).
//   3. Load more bookmarks if current bookmarks are few.
//   4. This action is called again because of the new loaded bookmarks.
//   5. Do not load again if our server does not return new bookmarks.
// Be careful not to cause an infinite loop!
export function loadMoreBookmarks(count: number): Thunk {
  return thunkAs('loadMoreBookmarks', async (dispatch, getState, {api}) => {
    // TODO: reimplement.
  });
}

export function openBookmark(id: string): Thunk {
  return thunk(async (dispatch, getState, {api}) => {
    dispatch({type: 'OPEN_BOOKMARK', id});
    api.openBookmark(id);
  });
}

export function resetOpenBookmark(id: string): Thunk {
  return thunk(async (dispatch, getState, {api}) => {
    dispatch({type: 'RESET_OPEN_BOOKMARK', id});
    api.resetOpenBookmark(id);
  });
}
