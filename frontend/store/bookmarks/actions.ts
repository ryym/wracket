import {thunk} from 'redux-dutiful-thunk';
import {Thunk} from '../../action';
import {SearchCondition} from '../../lib/models';

export function syncBookmarks(): Thunk {
  return thunk(async (dispatch, getState, {api}) => {
    dispatch({type: 'SYNC_BOOKMARKS_START'});
    const bookmarks = await api.synchronize(getState().searchCondition);
    if (bookmarks) {
      dispatch({
        type: 'SYNC_BOOKMARKS_SUCCESS',
        bookmarks,
      });
    }
  });
}

// TODO: Do not fetch stored bookmarks again.
export function search(cdtn: Partial<SearchCondition>): Thunk {
  return thunk(async (dispatch, getState, {api}) => {
    dispatch({type: 'SEARCH_START'});

    const nextCdtn = {
      ...getState().searchCondition,
      ...cdtn,
    };
    const bookmarks = await api.search(nextCdtn);

    if (bookmarks) {
      dispatch({
        type: 'SEARCH_SUCCESS',
        condition: nextCdtn,
        bookmarks,
      });
    }
  });
}
