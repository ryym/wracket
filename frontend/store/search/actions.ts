import {thunkAs} from 'redux-dutiful-thunk';
import {push} from 'connected-react-router';
import {Action, Thunk} from '../../action';
import {SearchCondition} from '../../lib/models';
import {conditionToQuery, queryToCondition} from '../../lib/search-query';
import {getSearchCondition} from './selectors';

export function search(partialCdtn: Partial<SearchCondition>): Thunk {
  return thunkAs('search', async (dispatch, getState) => {
    const condition = {
      ...getSearchCondition(getState()),
      ...partialCdtn,
    };
    const query = conditionToQuery(condition);

    dispatch({type: 'SEARCH', condition, query});

    const currentPath = getState().router.location.pathname;
    dispatch(push(`${currentPath}?${query}`));
  });
}

export function searchFromQuery(urlQuery: string): Thunk {
  return thunkAs('searchFromQuery', async (dispatch, getState) => {
    const currentCdtn = getSearchCondition(getState());
    const queryCdtn = queryToCondition(urlQuery);

    // Browser's back or forward button is used.
    // Reflect the URL query to the search state.
    if (!shallowEqual(queryCdtn, currentCdtn)) {
      const query = conditionToQuery(queryCdtn);
      dispatch({type: 'SEARCH', condition: queryCdtn, query});
    }
  });
}

const shallowEqual = <O extends {[key: string]: any}>(a: O, b: O): boolean => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every(key => a[key] == b[key]);
};

export function toggleSearchPanelCollapsibility(enabled: boolean): Action {
  return {type: 'TOGGLE_SEARCH_PANEL_COLLAPSIBILITY', enabled};
}
