import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedCounter} from './Counter';
import {Store} from '../../store';

export type Props = {
  store: Store;
};

export function WelcomePage({store}: Props) {
  return (
    <Provider store={store}>
      <div>
        <h1>Redux sample</h1>
        <ConnectedCounter />
      </div>
    </Provider>
  );
}
