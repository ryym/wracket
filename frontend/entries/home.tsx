import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {HomePage} from '../components/HomePage';

const $json = document.getElementById('bookmarks-data');
if ($json == null) {
  throw new Error('initial data script not found');
}

const bookmarks = JSON.parse($json.innerText);

const store = configureStore({
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
