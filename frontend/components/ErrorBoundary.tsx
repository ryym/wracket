import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from '../store';
import {State} from '../state';
import {catchError} from '../store/actions';
import {getCurrentError} from '../store/selectors';

export interface Props {
  err: Error | null;
  children?: any;
}
export type AllProps = Props & {dispatch: Dispatch};

export class _ErrorBoundary extends React.PureComponent<AllProps> {
  componentDidCatch(err: Error) {
    this.props.dispatch(catchError(err));
  }

  render() {
    const {err} = this.props;
    return (
      <>
        {err && <div>ERROR: {err.message}</div>}
        {this.props.children}
      </>
    );
  }
}

export const ErrorBoundary = connect((state: State): Props => ({
  err: getCurrentError(state),
}))(_ErrorBoundary);
