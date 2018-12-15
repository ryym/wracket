import {thunkAs} from 'redux-dutiful-thunk';
import {Action, Thunk} from '../../action';
import {SearchCondition} from '../../lib/models';
import {conditionToQuery} from '../../lib/search-query';
import {getSearchCondition} from './selectors';

export function search(partialCdtn: Partial<SearchCondition>): Thunk {
  return thunkAs('search', async (dispatch, getState) => {
    const condition = {
      ...getSearchCondition(getState()),
      ...partialCdtn,
    };
    const query = conditionToQuery(condition);

    dispatch({type: 'SEARCH', condition, query});
  });
}

export function toggleSearchPanelCollapsibility(enabled: boolean): Action {
  return {type: 'TOGGLE_SEARCH_PANEL_COLLAPSIBILITY', enabled};
}
