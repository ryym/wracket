import {fake} from 'sinon';
import {isThunkAction} from 'redux-dutiful-thunk';
import {State, newState} from '../../state';
import {SearchCondition, Bookmark, BookmarkStatus, SyncStatus} from '../../lib/models';
import {pick} from '../../lib/obj';
import * as sels from '../selectors';
import * as actions from './actions';

describe('syncBookmarks', () => {
  it('runs bookmark synchronization', async () => {
    const deps = {
      getSearchCondition: (_state: State): SearchCondition => ({statuses: []}),
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
    const payload = {conditionChangeOnly: true};

    await actions.updateShownBookmarks(payload, deps).thunk(dispatch, newState);

    expect(dispatch.args).toEqual([[{type: 'UPDATE_SHOWN_BOOKMARKS', ids: expectedIds}]]);
  });

  it('selects bookmarks based on current state', async () => {
    const bookmarksById = {};
    const cdtn = {statuses: []};
    const deps = {
      getBookmarksById: () => bookmarksById,
      getSearchCondition: () => cdtn,
      getCurrentQueryState: () => ({count: 10, allFetched: false}),
      selectShownIds: fake.returns([]),
    };

    const dispatch = fake();
    const payload = {conditionChangeOnly: true};
    await actions.updateShownBookmarks(payload, deps).thunk(dispatch, newState);

    expect(deps.selectShownIds.lastCall.args).toEqual([bookmarksById, cdtn, 10]);
  });

  describe('when some bookmarks are changed', () => {
    it('clears query count caches', async () => {
      const dispatch = fake();
      await actions.updateShownBookmarks({conditionChangeOnly: false}).thunk(dispatch, newState);

      expect(dispatch.args).toEqual([
        [{type: 'CLEAR_QUERY_COUNT_CACHES'}],
        [{type: 'UPDATE_SHOWN_BOOKMARKS', ids: []}],
      ]);
    });
  });
});

describe('loadMoreBookmarks', () => {
  it('runs bookmark search', async () => {
    const bookmark = {
      id: '1',
      title: 'test bookmark',
      url: 'https://example.com',
      status: BookmarkStatus.Unread,
      addedAt: Date.now(),
      archivedAt: null,
      favorite: false,
      thumbnailUrl: 'example.png',
    };
    const searchCdtn = {statuses: []};

    const search = async (cdtn: SearchCondition, last: Bookmark | null) => {
      return {
        bookmarks: {},
        isLast: last === bookmark,
        syncStatus: SyncStatus.Done,
      };
    };

    const deps = {
      ...pick(sels, 'getCurrentQueryState'),
      getLastBookmark: () => bookmark,
      getSearchCondition: () => searchCdtn,
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
