import {thunkAs} from 'redux-dutiful-thunk';
import {Thunk} from '../../../action';
import {SearchCondition, SyncStatus} from '../../../lib/models';
import {synchronize, search, SearchResult} from '../../../lib/api';
import {getSearchCondition} from '../../selectors';

export function syncBookmarks(
  d = {
    getSearchCondition,
    synchronize,
  },
): Thunk {
  return thunkAs(syncBookmarks.name, async (dispatch, getState) => {
    dispatch({type: 'SYNC_BOOKMARKS_START'});

    const cdtn = d.getSearchCondition(getState());
    const bookmarks = await d.synchronize(cdtn);
    dispatch({
      type: 'SYNC_BOOKMARKS_OK',
      bookmarks,
    });
  });
}

// Should be used only when the first synchronization is on going.
export function pollInitialBookmarks(
  d = {
    getSearchCondition,
    poll: doPollInitialBookmarks,
  },
): Thunk {
  return thunkAs(pollInitialBookmarks.name, async (dispatch, getState) => {
    dispatch({type: 'LOAD_MORE_BOOKMARKS_START'});

    const result = await d.poll(() => d.getSearchCondition(getState()));
    if (result == null) {
      throw new Error('could not synchronize with Pocket. Please try again later.');
    }

    dispatch({
      type: 'LOAD_MORE_BOOKMARKS_OK',
      bookmarks: result.bookmarks,
      isLast: result.isLast,
      syncStatus: result.syncStatus,
    });
  });
}

async function doPollInitialBookmarks(
  getSearchCdtn: () => SearchCondition,
  d = {search},
): Promise<SearchResult | null> {
  const maxTry = 10;
  for (let i = 1; i <= maxTry; i++) {
    const result = await d.search(getSearchCdtn());
    if (result.syncStatus !== SyncStatus.NotYet) {
      return result;
    }
    await waitMS(i * 1000);
  }
  return null;
}

const waitMS = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
