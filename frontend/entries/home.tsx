import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {IS_DEVELOPMENT} from '../consts';
import {configureStore} from '../store';
import {ErrorBoundary} from '../components/ErrorBoundary';
import {HomePage} from '../components/HomePage';
import {findCSRFToken} from '../lib/csrf-token';
import {createAPI} from '../lib/api';
import {Bookmarks} from '../lib/models';
import {ThunkContext} from '../thunk-ctx';

const csrfToken = findCSRFToken();
if (csrfToken == null) {
  throw new Error('could not find CSRF token');
}

const $json = document.getElementById('bookmarks-data');
if ($json == null) {
  throw new Error('initial data script not found');
}

const api = createAPI(csrfToken);
const thunkCtx = new ThunkContext(api);

const bookmarks = JSON.parse($json.innerText) as Bookmarks;

const store = configureStore({
  context: thunkCtx,
  initialState: {bookmarks},
});

if (IS_DEVELOPMENT) {
  // For easy debugging.
  (window as any)._store = store;
}

render(
  <Provider store={store}>
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('bookmark-list'),
);
