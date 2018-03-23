import {Counter} from '../../state';
import {Action} from '../../action';

const initialState: Counter = {count: 0};

export const reduceCounter = (
  {count}: Counter = initialState,
  action: Action,
): Counter => {
  switch (action.type) {
    case 'INCR':
      return {count: count + 1};
    default:
      return {count};
  }
};
