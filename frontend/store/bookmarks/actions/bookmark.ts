import {thunkAs} from 'redux-dutiful-thunk';
import {Thunk} from '../../../action';
import {BookmarkStatus} from '../../../lib/models';
import * as api from '../../../lib/api';
import {getBookmark} from '../../selectors';

export function openBookmark(
  id: string,
  d = {
    openBookmark: api.openBookmark,
  },
): Thunk {
  return thunkAs(openBookmark.name, async (dispatch, getState) => {
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
  return thunkAs(resetOpenBookmark.name, async (dispatch, getState) => {
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
  return thunkAs(favoriteBookmark.name, async (dispatch, getState) => {
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
  return thunkAs(unfavoriteBookmark.name, async (dispatch, getState) => {
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
  return thunkAs(archiveBookmark.name, async (dispatch, getState) => {
    const bk = d.getBookmark(getState(), id);
    if (bk == null || bk.status === BookmarkStatus.Archived) {
      return;
    }

    const prevStatus = bk.status;
    dispatch({type: 'ARCHIVE_BOOKMARK_START', id});

    const res = await d.archiveBookmark(id).catch(err => {
      dispatch({type: 'ARCHIVE_BOOKMARK_ERR', id, err, prevStatus});
    });

    if (res != null) {
      dispatch({type: 'ARCHIVE_BOOKMARK_OK', id, archivedAt: res.archivedAt});
    }
  });
}

export function readdBookmark(
  id: string,
  d = {
    getBookmark,
    readdBookmark: api.readdBookmark,
  },
): Thunk {
  return thunkAs(readdBookmark.name, async (dispatch, getState) => {
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
  return thunkAs(deleteBookmark.name, async (dispatch, getState) => {
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
