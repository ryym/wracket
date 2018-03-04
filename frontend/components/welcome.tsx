import React from 'react';
import {render} from 'react-dom';

function Hello() {
  return <div>Hello from React</div>;
}

export function renderView() {
  render(<Hello />, document.getElementById('welcome-root'));
}
