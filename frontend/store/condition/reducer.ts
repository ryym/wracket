import {Action} from '../../action';
import {BookmarkStatus, SearchCondition} from '../../lib/models';

const init: SearchCondition = {
  status: BookmarkStatus.Unread,
};

export function reduceCondition(cdtn: SearchCondition = init, action: Action): SearchCondition {
  switch (action.type) {
    case 'SEARCH_SUCCESS':
      return action.condition;
    default:
      return cdtn;
  }
}
