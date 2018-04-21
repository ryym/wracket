import {State} from '../../state';
import {SearchCondition} from '../../lib/models';

export const getSearchCondition = (state: State): SearchCondition => {
  return state.search.condition;
};

export const getLastBookmarkCount = ({search}: State): number | null => {
  const qs = search.stateByQuery[search.currentQuery];
  return qs == null ? null : qs.count;
};
