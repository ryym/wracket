import {thunk} from 'redux-dutiful-thunk';
import {Thunk} from '../action';

export function ping(name: string): Thunk {
  return thunk(async (_dispatch, _getState, {api}) => {
    console.log(await api.ping(name));
  });
}
