import React from 'react';
import {render} from 'react-dom';
import {HomePage} from '../components/HomePage';
import {Bookmark} from '../lib/Bookmark';

const $json = document.getElementById('bookmarks-data');
if ($json == null) {
  throw new Error('initial data script not found');
}

const bookmarks = JSON.parse($json.innerText) as Bookmark[];

render(<HomePage bookmarks={bookmarks} />, document.getElementById('bookmark-list'));
