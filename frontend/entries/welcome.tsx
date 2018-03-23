import React from 'react';
import {render} from 'react-dom';
import {configureStore} from '../store';
import {WelcomePage} from '../components/WelcomePage';

window.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  render(<WelcomePage store={store} />, document.getElementById('welcome-root'));
});
