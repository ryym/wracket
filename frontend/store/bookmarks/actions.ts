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

export function cacheBookmarkCount(count: number): Action {
  return {type: 'UPDATE_QUERY_COUNT', count};
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
    const state = getState();
    const qs = getCurrentQueryState(state);
    if (qs != null && qs.allFetched) {
      return;
    }

    dispatch({type: 'LOAD_MORE_BOOKMARKS_START'});

    const lastBookmark = listBookmarks(state)[count - 1];
    const result = await api.search(getSearchCondition(state), lastBookmark);
    if (result) {
      dispatch({
        type: 'LOAD_MORE_BOOKMARKS_SUCCESS',
        bookmarks: result.bookmarks,
        isLast: result.isLast,
      });
    }
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
