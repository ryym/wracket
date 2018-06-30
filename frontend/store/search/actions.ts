import {Action} from '../../action';

export function toggleSearchPanelCollapsibility(enabled: boolean): Action {
  return {type: 'TOGGLE_SEARCH_PANEL_COLLAPSIBILITY', enabled};
}
