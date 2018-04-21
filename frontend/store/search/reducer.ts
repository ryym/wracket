import {Action} from '../../action';
import {SearchState, newSearchState} from '../../state';

export function reduceSearch(state: SearchState = newSearchState(), action: Action): SearchState {
  switch (action.type) {
    case 'SEARCH':
      return {
        ...state,
        condition: {
          ...state.condition,
          ...action.condition,
        },
      };

    default:
      return state;
  }
}
