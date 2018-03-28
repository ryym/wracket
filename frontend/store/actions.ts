import {thunk} from 'redux-dutiful-thunk';
import {Thunk} from '../action';

export function ping(name: string): Thunk {
  return thunk(async (_dispatch, _getState, {api}) => {
    const res = await api.ping(name);
    console.log('PONG', res.data);
  });
}
