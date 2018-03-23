import {thunk} from 'redux-dutiful-thunk';
import {Action, Thunk} from '../../action';

export const incr = (): Action => ({type: 'INCR'});

export const incrLater = (ms: number): Thunk<number> => {
  return thunk(async dispatch => {
    setTimeout(() => dispatch({type: 'INCR'}), ms);
    return ms;
  });
};
