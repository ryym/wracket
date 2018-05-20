import '../global-styles/base.scss';
import '../global-styles/mdc.scss';

import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {IS_DEVELOPMENT} from '../consts';
import {configureStore} from '../store';
import {newBookmarkState} from '../state';
import {ErrorBoundary} from '../components/ErrorBoundary';
import {HomePage} from '../components/HomePage';
import {BookmarkById} from '../lib/models';

const $json = document.getElementById('bookmarks-data');
if ($json == null) {
  throw new Error('initial data script not found');
}

const bookmarks = JSON.parse($json.innerText) as BookmarkById;

const store = configureStore({
  initialState: {
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
