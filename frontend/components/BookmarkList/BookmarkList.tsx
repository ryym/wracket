import React from 'react';
import {Bookmark} from '../../lib/Bookmark';

export interface Props {
  readonly bookmarks: Bookmark[];
}

export function BookmarkList({bookmarks}: Props) {
  const items = bookmarks.map(b => (
    <li key={b.id}>
      <a href={b.url} target="_blank">
        {b.title}
      </a>
    </li>
  ));
  return (
    <div>
      <ul>{items}</ul>
    </div>
  );
}
