import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {WelcomePage} from '../components/WelcomePage';

window.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  render(
    <Provider store={store}>
      <WelcomePage />
    </Provider>,
    document.getElementById('welcome-root'),
  );
});
