import {Action} from '../../action';
import {ErrorsState, newErrorsState} from '../../state';

export function reduceErrors(es: ErrorsState = newErrorsState(), action: Action): ErrorsState {
  switch (action.type) {
    case 'CATCH_ERR':
      return {...es, err: action.err};

    default:
      return es;
  }
}
