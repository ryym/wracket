import {Action} from '../../action';
import {newSearchConditionState as newState} from '../../state';
import {BookmarkStatus, SearchCondition} from '../../lib/models';

export function reduceCondition(
  cdtn: SearchCondition = newState(),
  action: Action,
): SearchCondition {
  switch (action.type) {
    case 'SEARCH_SUCCESS':
      return action.condition;
    default:
      return cdtn;
  }
}
