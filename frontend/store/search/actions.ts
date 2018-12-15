import {Action} from '../../action';
import {SearchCondition} from '../../lib/models';

export function search(condition: Partial<SearchCondition>): Action {
  return {type: 'SEARCH', condition};
}

export function toggleSearchPanelCollapsibility(enabled: boolean): Action {
  return {type: 'TOGGLE_SEARCH_PANEL_COLLAPSIBILITY', enabled};
}
