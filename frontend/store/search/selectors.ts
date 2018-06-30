import {State, QueryState} from '../../state';
import {SearchCondition} from '../../lib/models';

export const getSearchCondition = (state: State): SearchCondition => {
  return state.search.condition;
};

export const getCurrentQueryState = ({search}: State): QueryState | null => {
  return search.stateByQuery[search.currentQuery];
};

export const canLoadMore = (state: State): boolean => {
  const qs = getCurrentQueryState(state);
  return qs == null || !qs.allFetched;
};

export const isSearchPanelCollapsible = ({search}: State): boolean => search.panelCollapsible;
