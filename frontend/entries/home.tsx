import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {Bookmarks} from '../state';
import {HomePage} from '../components/HomePage';
import {findCSRFToken} from '../lib/csrf-token';
import {createAPI} from '../lib/api';
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

render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  document.getElementById('bookmark-list'),
);
