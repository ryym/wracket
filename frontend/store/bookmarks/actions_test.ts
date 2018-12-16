import {fake} from 'sinon';
import {isThunkAction} from 'redux-dutiful-thunk';
import {newState} from '../../state';
import {SearchCondition, SyncStatus, StatusFilter, SortKey} from '../../lib/models';
import {pick} from '../../lib/obj';
import * as sels from '../selectors';
import * as actions from './actions';

const defaultSearchCondition = (): SearchCondition => ({
  statusFilter: StatusFilter.New,
  sortKey: SortKey.AddedAt,
});

describe('syncBookmarks', () => {
  it('runs bookmark synchronization', async () => {
    const deps = {
      getSearchCondition: defaultSearchCondition,
      synchronize: fake.resolves({}),
    };

    const dispatch = fake();
    await actions.syncBookmarks(deps).thunk(dispatch, newState);

    expect(dispatch.args).toEqual([
      [{type: 'SYNC_BOOKMARKS_START'}],
      [{type: 'SYNC_BOOKMARKS_OK', bookmarks: {}}],
    ]);
  });
});

describe('initShownBookmarks', () => {
  it('just fires updateShownBookmarks', async () => {
    const dispatch = fake();
    await actions.initShownBookmarks().thunk(dispatch, newState);

    expect(dispatch.callCount).toBe(1);

    const action = dispatch.lastArg;
    expect(isThunkAction(action)).toBe(true);
    expect(action.thunkType).toEqual(actions.updateShownBookmarks.name);
  });
});

describe('updateShownBookmarks', () => {
  it('updates shown bookmark IDs', async () => {
    const expectedIds = ['1', '2', '3'];
    const deps = {
      ...pick(sels, 'getBookmarksById', 'getSearchCondition', 'getCurrentQueryState'),
      selectShownIds: () => expectedIds,
    };
    const dispatch = fake();

    await actions.updateShownBookmarks(deps).thunk(dispatch, newState);

    expect(dispatch.args).toEqual([[{type: 'UPDATE_SHOWN_BOOKMARKS', ids: expectedIds}]]);
  });

  it('selects bookmarks based on current state', async () => {
    const bookmarksById = {};
    const cdtn = defaultSearchCondition();
    const deps = {
      getBookmarksById: () => bookmarksById,
      getSearchCondition: () => cdtn,
      getCurrentQueryState: () => ({count: 10, allFetched: false}),
      selectShownIds: fake.returns([]),
    };

    const dispatch = fake();
    await actions.updateShownBookmarks(deps).thunk(dispatch, newState);

    expect(deps.selectShownIds.lastCall.args).toEqual([bookmarksById, cdtn, 10]);
  });
});

describe('loadMoreBookmarks', () => {
  it('runs bookmark search', async () => {
    const search = async (_cdtn: SearchCondition, _offset?: number) => {
      return {
        bookmarks: {},
        isLast: true,
        syncStatus: SyncStatus.Done,
      };
    };

    const deps = {
      ...pick(sels, 'getCurrentQueryState'),
      getSearchCondition: defaultSearchCondition,
      search,
    };

    const dispatch = fake();
    await actions.loadMoreBookmarks(deps).thunk(dispatch, newState);

    expect(dispatch.args).toEqual([
      [{type: 'LOAD_MORE_BOOKMARKS_START'}],
      [{type: 'LOAD_MORE_BOOKMARKS_OK', bookmarks: {}, isLast: true, syncStatus: SyncStatus.Done}],
    ]);
  });

  describe('when all data is already fetched', () => {
    it('does nothing', async () => {
      const deps = {
        ...pick(sels, 'getLastBookmark', 'getSearchCondition'),
        getCurrentQueryState: () => ({count: 10, allFetched: true}),
        search: async () => ({
          bookmarks: {},
          isLast: true,
          syncStatus: SyncStatus.Done,
        }),
      };

      const dispatch = fake();
      await actions.loadMoreBookmarks(deps).thunk(dispatch, newState);

      expect(dispatch.args).toEqual([]);
    });
  });
});
