import {thunkAs} from 'redux-dutiful-thunk';
import {Thunk} from '../../../action';
import {selectShownIds} from '../../../lib/bookmark-lister';
import * as api from '../../../lib/api';
import {getBookmarksById, getSearchCondition, getCurrentQueryState} from '../../selectors';

export function initShownBookmarks(): Thunk {
  return thunkAs(initShownBookmarks.name, async (dispatch, getState) => {
    dispatch(updateShownBookmarks());
  });
}

export function updateShownBookmarks(
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
  opts: {hasDesiredCount: boolean} = {hasDesiredCount: false},
  d = {
    getCurrentQueryState,
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

    // Skip searching if we have enough bookmarks in store,
    // only if a query state exists. If not, it indicates
    // we have never searched with the current search condition,
    // so there may be additional data in server.
    if (opts.hasDesiredCount && qs != null) {
      return;
    }

    dispatch({type: 'LOAD_MORE_BOOKMARKS_START'});

    const offset = qs == null ? null : qs.count;
    const result = await d.search(d.getSearchCondition(state), offset);
    dispatch({
      type: 'LOAD_MORE_BOOKMARKS_OK',
      bookmarks: result.bookmarks,
      isLast: result.isLast,
      syncStatus: result.syncStatus,
    });
  });
}
