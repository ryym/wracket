import {State} from '../../state';
import {SearchCondition} from '../../lib/models';

export const getSearchCondition = (state: State): SearchCondition => {
  return state.search.condition;
};
