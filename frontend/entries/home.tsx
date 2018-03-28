import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
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

const bookmarks = JSON.parse($json.innerText);

const store = configureStore({
  context: thunkCtx,
  initialState: {
    bookmarks: {
      ids: bookmarks.ids,
      byId: bookmarks.by_id,
    },
  },
});

render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  document.getElementById('bookmark-list'),
);
