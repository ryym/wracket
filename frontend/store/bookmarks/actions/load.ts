import {thunkAs} from 'redux-dutiful-thunk';
import {Action, Thunk} from '../../../action';
import {SearchCondition} from '../../../lib/models';
import {selectShownIds} from '../../../lib/bookmark-lister';
import * as api from '../../../lib/api';
import {
  getLastBookmark,
  getBookmarksById,
  getSearchCondition,
  getCurrentQueryState,
} from '../../selectors';

export function search(condition: Partial<SearchCondition>): Action {
  return {type: 'SEARCH', condition};
}

export function initShownBookmarks(): Thunk {
  return thunkAs(initShownBookmarks.name, async (dispatch, getState) => {
    dispatch(updateShownBookmarks({conditionChangeOnly: true}));
  });
}

export function updateShownBookmarks(
  {conditionChangeOnly}: {conditionChangeOnly: boolean},
  d = {
    getBookmarksById,
    getSearchCondition,
    getCurrentQueryState,
    selectShownIds,
  },
): Thunk {
  return thunkAs(updateShownBookmarks.name, async (dispatch, getState) => {
    const state = getState();
    const bookmarksById = d.getBookmarksById(state);
    const cdtn = d.getSearchCondition(state);

    if (!conditionChangeOnly) {
      dispatch({type: 'CLEAR_QUERY_COUNT_CACHES'});
    }

    const qs = d.getCurrentQueryState(state);
    const ids = d.selectShownIds(bookmarksById, cdtn, qs ? qs.count : null);
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
export function loadMoreBookmarks(
  d = {
    getCurrentQueryState,
    getLastBookmark,
    getSearchCondition,
    search: api.search,
  },
): Thunk {
  return thunkAs(loadMoreBookmarks.name, async (dispatch, getState) => {
    const state = getState();
    const qs = d.getCurrentQueryState(state);
    if (qs != null && qs.allFetched) {
      return;
    }

    dispatch({type: 'LOAD_MORE_BOOKMARKS_START'});
    const lastBookmark = d.getLastBookmark(state);

    const result = await d.search(d.getSearchCondition(state), lastBookmark);
    dispatch({
      type: 'LOAD_MORE_BOOKMARKS_OK',
      bookmarks: result.bookmarks,
      isLast: result.isLast,
      syncStatus: result.syncStatus,
    });
  });
}
