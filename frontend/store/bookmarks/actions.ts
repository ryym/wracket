import {thunk, thunkAs} from 'redux-dutiful-thunk';
import {Action, Thunk} from '../../action';
import {SearchCondition, BookmarkStatus} from '../../lib/models';
import {selectShownIds} from '../../lib/bookmark-lister';
import * as api from '../../lib/api';
import {
  getLastBookmark,
  getBookmarksById,
  getBookmark,
  getSearchCondition,
  getCurrentQueryState,
} from '../selectors';

export function syncBookmarks(
  d = {
    getSearchCondition,
    synchronize: api.synchronize,
  },
): Thunk {
  return thunk(async (dispatch, getState) => {
    dispatch({type: 'SYNC_BOOKMARKS_START'});

    const cdtn = d.getSearchCondition(getState());
    const bookmarks = await d.synchronize(cdtn);

    if (bookmarks) {
      dispatch({
        type: 'SYNC_BOOKMARKS_OK',
        bookmarks,
      });
    }
  });
}

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
    if (result) {
      dispatch({
        type: 'LOAD_MORE_BOOKMARKS_OK',
        bookmarks: result.bookmarks,
        isLast: result.isLast,
      });
    }
  });
}

export function openBookmark(
  id: string,
  d = {
    openBookmark: api.openBookmark,
  },
): Thunk {
  return thunk(async (dispatch, getState) => {
    await d.openBookmark(id);
    dispatch({type: 'OPEN_BOOKMARK', id});
  });
}

export function resetOpenBookmark(
  id: string,
  d = {
    resetOpenBookmark: api.resetOpenBookmark,
  },
): Thunk {
  return thunk(async (dispatch, getState) => {
    await d.resetOpenBookmark(id);
    dispatch({type: 'RESET_OPEN_BOOKMARK', id});
  });
}

export function favoriteBookmark(
  id: string,
  d = {
    getBookmark,
    favoriteBookmark: api.favoriteBookmark,
  },
): Thunk {
  return thunk(async (dispatch, getState) => {
    const bk = d.getBookmark(getState(), id);
    if (bk == null || bk.favorite) {
      return;
    }

    dispatch({type: 'FAVORITE_BOOKMARK_START', id});

    await d.favoriteBookmark(id).catch(err => {
      dispatch({type: 'FAVORITE_BOOKMARK_ERR', id, err});
    });
  });
}

export function unfavoriteBookmark(
  id: string,
  d = {
    getBookmark,
    unfavoriteBookmark: api.unfavoriteBookmark,
  },
): Thunk {
  return thunk(async (dispatch, getState) => {
    const bk = d.getBookmark(getState(), id);
    if (bk == null || !bk.favorite) {
      return;
    }

    dispatch({type: 'UNFAVORITE_BOOKMARK_START', id});

    await d.unfavoriteBookmark(id).catch(err => {
      dispatch({type: 'UNFAVORITE_BOOKMARK_ERR', id, err});
    });
  });
}

export function archiveBookmark(
  id: string,
  d = {
    getBookmark,
    archiveBookmark: api.archiveBookmark,
  },
): Thunk {
  return thunk(async (dispatch, getState) => {
    const bk = d.getBookmark(getState(), id);
    if (bk == null || bk.status === BookmarkStatus.Archived) {
      return;
    }

    const prevStatus = bk.status;
    dispatch({type: 'ARCHIVE_BOOKMARK_START', id});

    await d.archiveBookmark(id).catch(err => {
      dispatch({type: 'ARCHIVE_BOOKMARK_ERR', id, err, prevStatus});
    });
  });
}

export function readdBookmark(
  id: string,
  d = {
    getBookmark,
    readdBookmark: api.readdBookmark,
  },
): Thunk {
  return thunk(async (dispatch, getState) => {
    const bk = d.getBookmark(getState(), id);
    if (bk == null || bk.status !== BookmarkStatus.Archived) {
      return;
    }

    dispatch({type: 'READD_BOOKMARK_START', id});

    await d.readdBookmark(id).catch(err => {
      dispatch({type: 'READD_BOOKMARK_ERR', id, err});
    });
  });
}

export function deleteBookmark(
  id: string,
  d = {
    getBookmark,
    deleteBookmark: api.deleteBookmark,
  },
): Thunk {
  return thunk(async (dispatch, getState) => {
    const bk = d.getBookmark(getState(), id);
    if (bk == null || bk.status === BookmarkStatus.Deleted) {
      return;
    }

    const prevStatus = bk.status;
    dispatch({type: 'DELETE_BOOKMARK_START', id});

    await d.deleteBookmark(id).catch(err => {
      dispatch({type: 'DELETE_BOOKMARK_ERR', id, err, prevStatus});
    });
  });
}
