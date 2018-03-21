import React from 'react';
import {render} from 'react-dom';
import {BookmarkList} from './components/BookmarkList';
import {Bookmark} from './lib/Bookmark';

const $json = document.getElementById('bookmarks-data');
if ($json == null) {
  throw new Error('initial data script not found');
}

const bookmarks = JSON.parse($json.innerText) as Bookmark[];

render(
  <BookmarkList bookmarks={bookmarks} />,
  document.getElementById('bookmark-list'),
);
