import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {IS_DEVELOPMENT} from '../consts';
import {configureStore} from '../store';
import {newBookmarkState} from '../state';
import {ErrorBoundary} from '../components/ErrorBoundary';
import {HomePage} from '../components/HomePage';
import {BookmarkById, User} from '../lib/models';

type InitialData = {
  user: User;
  bookmarks: BookmarkById;
};

const $json = document.getElementById('initial-data');
if ($json == null) {
  throw new Error('initial data script not found');
}

const {user, bookmarks} = JSON.parse($json.innerText) as InitialData;

const store = configureStore({
  initialState: {
    user,
    bookmarks: newBookmarkState(bookmarks),
  },
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
  document.getElementById('root'),
);
