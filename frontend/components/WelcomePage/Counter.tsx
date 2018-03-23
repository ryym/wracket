import React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from '../../store';
import {State} from '../../state';
import {incr, incrLater} from '../../store/actions';
import {getCount} from '../../store/selectors';

export interface Props {
  count: number;
}
type AllProps = Props & {dispatch: Dispatch};

export function Counter({count, dispatch}: AllProps) {
  return (
    <div>
      count: {count}
      <button onClick={() => dispatch(incr())}>increment</button>
      <button onClick={() => dispatch(incrLater(500))}>increment later</button>
    </div>
  );
}

export const ConnectedCounter = connect((state: State): Props => ({
  count: getCount(state),
}))(Counter);
