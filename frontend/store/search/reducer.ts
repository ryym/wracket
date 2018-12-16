import {updateObj} from '../../lib/obj';
import {SyncStatus} from '../../lib/models';
import {Action} from '../../action';
import {SearchState, newSearchState} from '../../state';

export function reduceSearch(state: SearchState = newSearchState(), action: Action): SearchState {
  switch (action.type) {
    case 'SEARCH': {
      return {
        ...state,
        condition: action.condition,
        currentQuery: action.query,
      };
    }

    case 'SYNC_BOOKMARKS_OK':
      return {
        ...state,
        stateByQuery: {},
      };

    case 'LOAD_MORE_BOOKMARKS_OK':
      return {
        ...state,
        stateByQuery: updateObj(state.stateByQuery, state.currentQuery, s => ({
          count: (s ? s.count : 0) + Object.keys(action.bookmarks).length,
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
