import React from 'react';
import {Bookmark} from '../../lib/models';

export interface Props {
  readonly bookmarks: Bookmark[];
  readonly onBookmarkOpen?: (b: Bookmark) => void;
}

export function BookmarkList({bookmarks, onBookmarkOpen = () => {}}: Props) {
  const items = bookmarks.map(b => (
    <li key={b.id}>
      <a href={b.url} target="_blank" onClick={() => onBookmarkOpen(b)}>
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
