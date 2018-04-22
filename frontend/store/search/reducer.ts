import {updateObj} from '../../lib/obj';
import {conditionToQuery} from '../../lib/search-query';
import {Action} from '../../action';
import {SearchState, newSearchState} from '../../state';

const initQueryState = {allFetched: false};

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

    case 'LOAD_MORE_BOOKMARKS_SUCCESS':
      return {
        ...state,
        stateByQuery: updateObj(state.stateByQuery, state.currentQuery, s => ({
          ...s,
          allFetched: action.isLast,
        })),
      };

    default:
      return state;
  }
}
