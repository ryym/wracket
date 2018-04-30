import {Action} from '../../action';

export function catchError(err: Error): Action {
  return {type: 'CATCH_ERR', caught: err};
}
