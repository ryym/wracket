import {Dispatch, Middleware} from 'redux';
import {isThunkAction} from 'redux-dutiful-thunk';
import {State} from '../state';
import {Action, isErrorAction} from '../action';
import {catchError} from './actions';

const getActionType = (act: Action): String => {
  const tp = act.type;
  return isThunkAction(act) && act.thunkType ? `${tp} (${act.thunkType})` : tp;
};

export function errorCatchMiddleware(): Middleware<{}, State, Dispatch<Action>> {
  return ({dispatch}) => {
    const storeCaughtErr = (action: Action) => (err: Error) => {
      console.error(`[error in action ${getActionType(action)}]`, err);
      dispatch(catchError(err));
    };

    return next => action => {
      try {
        const result = next(action);
        if (result != null && isThunkAction(result)) {
          result.promise.catch(storeCaughtErr(action));
        } else if (isErrorAction(action)) {
          storeCaughtErr(action)(action.err);
        }
      } catch (err) {
        storeCaughtErr(action)(err);
      }
    };
  };
}
