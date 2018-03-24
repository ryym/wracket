import React from 'react';
import {ConnectedCounter} from './Counter';
import {Store} from '../../store';

export function WelcomePage() {
  return (
    <div>
      <h1>Redux sample</h1>
      <ConnectedCounter />
    </div>
  );
}
