import React from 'react';

interface CompState {
  err?: Error;
}

export interface Props extends CompState {
  children?: any;
}

// TODO: Catch errors thrown in actions and reducers.

export class ErrorBoundary extends React.PureComponent<Props> {
  state: CompState = {};

  componentDidCatch(err: Error) {
    this.setState({err});
  }

  render() {
    const {err} = this.state;
    return (
      <>
        {err && <div>{err.message}</div>}
        {this.props.children}
      </>
    );
  }
}
