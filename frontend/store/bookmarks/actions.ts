import {thunk, thunkAs} from 'redux-dutiful-thunk';
import {Action, Thunk} from '../../action';
import {SearchCondition} from '../../lib/models';
import {selectShownIds} from '../../lib/bookmark-lister';
import {
  getLastBookmark,
  getBookmarksById,
  getSearchCondition,
  getCurrentQueryState,
} from '../selectors';

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

export function initShownBookmarks(): Thunk {
  return thunkAs('initShownBookmarks', async (dispatch, getState) => {
    dispatch(updateShownBookmarks({conditionChangeOnly: true}));
  });
}

export function updateShownBookmarks({conditionChangeOnly}: {conditionChangeOnly: boolean}): Thunk {
  return thunkAs('updateShownBookmarks', async (dispatch, getState) => {
    const state = getState();
    const bookmarksById = getBookmarksById(state);
    const cdtn = getSearchCondition(state);

    if (!conditionChangeOnly) {
      dispatch({type: 'CLEAR_QUERY_COUNT_CACHES'});
    }

    const qs = getCurrentQueryState(state);
    const ids = selectShownIds(bookmarksById, cdtn, qs ? qs.count : null);
    dispatch({type: 'UPDATE_SHOWN_BOOKMARKS', ids});
  });
}

// Flow:
//   1. Render a component with current bookmarks.
//   2. This action is called on the component update (when bookmarks changed).
//   3. Load more bookmarks if current bookmarks are few.
//   4. This action is called again because of the new loaded bookmarks.
//   5. Do not load again if our server does not return new bookmarks.
// Be careful not to cause an infinite loop!
export function loadMoreBookmarks(): Thunk {
  return thunkAs('loadMoreBookmarks', async (dispatch, getState, {api}) => {
    const state = getState();
    const qs = getCurrentQueryState(state);
    if (qs != null && qs.allFetched) {
      return;
    }

    dispatch({type: 'LOAD_MORE_BOOKMARKS_START'});
    const lastBookmark = getLastBookmark(state);

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
    await api.openBookmark(id);
    dispatch({type: 'OPEN_BOOKMARK', id});
  });
}

export function resetOpenBookmark(id: string): Thunk {
  return thunk(async (dispatch, getState, {api}) => {
    await api.resetOpenBookmark(id);
    dispatch({type: 'RESET_OPEN_BOOKMARK', id});
  });
}

export function favoriteBookmark(id: string): Thunk {
  return thunk(async (dispatch, getState, {api}) => {
    const res = await api.favoriteBookmark(id);
    if (res != null) {
      dispatch({type: 'FAVORITE_BOOKMARK', id, favoritedAt: res.favoritedAt});
    }
  });
}

export function unfavoriteBookmark(id: string): Thunk {
  return thunk(async (dispatch, getState, {api}) => {
    const res = await api.unfavoriteBookmark(id);
    if (res != null) {
      dispatch({type: 'UNFAVORITE_BOOKMARK', id});
    }
  });
}
