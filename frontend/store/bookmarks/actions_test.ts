import * as assert from 'assert';
import {fake} from 'sinon';
import {isThunkAction} from 'redux-dutiful-thunk';
import {State, newState} from '../../state';
import {SearchCondition, Bookmark, BookmarkStatus} from '../../lib/models';
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

    assert.deepStrictEqual(dispatch.args, [
      [{type: 'SYNC_BOOKMARKS_START'}],
      [{type: 'SYNC_BOOKMARKS_OK', bookmarks: {}}],
    ]);
  });
});

describe('initShownBookmarks', () => {
  it('just fires updateShownBookmarks', async () => {
    const dispatch = fake();
    await actions.initShownBookmarks().thunk(dispatch, newState);

    assert.equal(dispatch.callCount, 1, 'dispatch call count');

    const action = dispatch.lastArg;
    if (isThunkAction(action)) {
      assert.equal(action.thunkType, actions.updateShownBookmarks.name);
    } else {
      assert.fail('non-thunk action is dispatched');
    }
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

    assert.deepStrictEqual(dispatch.args, [[{type: 'UPDATE_SHOWN_BOOKMARKS', ids: expectedIds}]]);
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

    assert.deepStrictEqual(deps.selectShownIds.lastCall.args, [bookmarksById, cdtn, 10]);
  });

  context('when some bookmarks are changed', () => {
    it('clears query count caches', async () => {
      const dispatch = fake();
      await actions.updateShownBookmarks({conditionChangeOnly: false}).thunk(dispatch, newState);

      assert.deepStrictEqual(dispatch.args, [
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
      favorite: false,
      thumbnailUrl: null,
    };
    const searchCdtn = {statuses: []};

    const search = async (cdtn: SearchCondition, last: Bookmark | null) => {
      if (cdtn === searchCdtn && last === bookmark) {
        return {bookmarks: {}, isLast: true};
      }
      return null;
    };

    const deps = {
      ...pick(sels, 'getCurrentQueryState'),
      getLastBookmark: () => bookmark,
      getSearchCondition: () => searchCdtn,
      search,
    };

    const dispatch = fake();
    await actions.loadMoreBookmarks(deps).thunk(dispatch, newState);

    assert.deepStrictEqual(dispatch.args, [
      [{type: 'LOAD_MORE_BOOKMARKS_START'}],
      [{type: 'LOAD_MORE_BOOKMARKS_OK', bookmarks: {}, isLast: true}],
    ]);
  });

  context('when all data is already fetched', () => {
    it('does nothing', async () => {
      const deps = {
        ...pick(sels, 'getLastBookmark', 'getSearchCondition'),
        getCurrentQueryState: () => ({count: 10, allFetched: true}),
        search: async () => null,
      };

      const dispatch = fake();
      await actions.loadMoreBookmarks(deps).thunk(dispatch, newState);

      assert.deepStrictEqual(dispatch.args, []);
    });
  });
});
