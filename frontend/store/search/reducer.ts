import {updateObj} from '../../lib/obj';
import {conditionToQuery} from '../../lib/search-query';
import {Action} from '../../action';
import {SearchState, newSearchState} from '../../state';

const initQueryState = {};

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

    case 'UPDATE_QUERY_COUNT':
      return {
        ...state,
        stateByQuery: updateObj(state.stateByQuery, state.currentQuery, s => ({
          ...(s || initQueryState),
          count: action.count,
        })),
      };

    default:
      return state;
  }
}
