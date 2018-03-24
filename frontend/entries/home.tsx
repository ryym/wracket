import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {HomePage} from '../components/HomePage';
import {Bookmark} from '../lib/Bookmark';

const $json = document.getElementById('bookmarks-data');
if ($json == null) {
  throw new Error('initial data script not found');
}

const bookmarks = JSON.parse($json.innerText) as Bookmark[];

const store = configureStore();

render(
  <Provider store={store}>
    <HomePage bookmarks={bookmarks} />
  </Provider>,
  document.getElementById('bookmark-list'),
);
