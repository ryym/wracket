import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedCounter} from './Counter';
import {configureStore} from '../store';

const store = configureStore();

function Welcome() {
  return (
    <Provider store={store}>
      <div>
        <h1>Redux sample</h1>
        <ConnectedCounter />
      </div>
    </Provider>
  );
}

export function renderView() {
  render(<Welcome />, document.getElementById('welcome-root'));
}
