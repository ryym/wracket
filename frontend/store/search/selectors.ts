import {State, QueryState} from '../../state';
import {SearchCondition} from '../../lib/models';

export const getSearchCondition = (state: State): SearchCondition => {
  return state.search.condition;
};

export const getCurrentQueryState = ({search}: State): QueryState | null => {
  return search.stateByQuery[search.currentQuery];
};
