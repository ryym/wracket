import {updateObj} from '../../lib/obj';
import {SyncStatus} from '../../lib/models';
import {conditionToQuery} from '../../lib/search-query';
import {Action} from '../../action';
import {SearchState, newSearchState, SearchStateByQuery} from '../../state';

const initQueryState = {count: null, allFetched: false};

export function reduceSearch(state: SearchState = newSearchState(), action: Action): SearchState {
  switch (action.type) {
    case 'SEARCH': {
      const nextCdtn = {
        ...state.condition,
        ...action.condition,
      };
      return {
        ...state,
        condition: nextCdtn,
        currentQuery: conditionToQuery(nextCdtn),
      };
    }

    case 'SYNC_BOOKMARKS_OK':
      return {
        ...state,
        stateByQuery: {},
      };

    case 'UPDATE_SHOWN_BOOKMARKS':
      return {
        ...state,
        stateByQuery: updateObj(state.stateByQuery, state.currentQuery, s => {
          if (s != null && s.count === action.ids.length) {
            return s;
          }
          return {...(s || initQueryState), count: action.ids.length};
        }),
      };

    case 'CLEAR_QUERY_COUNT_CACHES':
      return {
        ...state,
        stateByQuery: clearCountCaches(state.stateByQuery),
      };

    case 'LOAD_MORE_BOOKMARKS_OK':
      return {
        ...state,
        stateByQuery: updateObj(state.stateByQuery, state.currentQuery, s => ({
          count: Object.keys(action.bookmarks).length > 0 ? null : s.count,
          allFetched: action.isLast && action.syncStatus === SyncStatus.Done,
        })),
      };

    case 'TOGGLE_SEARCH_PANEL_COLLAPSIBILITY':
      return {
        ...state,
        panelCollapsible: action.enabled,
      };

    default:
      return state;
  }
}

const clearCountCaches = (qss: SearchStateByQuery): SearchStateByQuery => {
  return Object.keys(qss).reduce((next: any, q) => {
    const qs = qss[q];
    next[q] = qs.allFetched ? {...qss[q], count: null} : qs;
    return next;
  }, {});
};
