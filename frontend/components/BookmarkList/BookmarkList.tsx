import React from 'react';
import {IS_DEVELOPMENT} from '../../consts';
import {Bookmark, BookmarkStatus} from '../../lib/models';

export interface Props {
  readonly bookmarks: Bookmark[];
  readonly onBookmarkOpen?: (b: Bookmark) => void;
  readonly onBackToUnread?: (b: Bookmark) => void;
}

export function BookmarkList({
  bookmarks,
  onBookmarkOpen = () => {},
  onBackToUnread = () => {},
}: Props) {
  const items = bookmarks.map(b => {
    return (
      <li key={b.id} {...(IS_DEVELOPMENT ? {'data-id': b.id} : {})}>
        <a href={b.url} target="_blank" onClick={() => onBookmarkOpen(b)}>
          {b.title}
        </a>
        <div>
          {b.status === BookmarkStatus.Reading && (
            <button onClick={() => onBackToUnread(b)}>unread</button>
          )}
        </div>
      </li>
    );
  });
  return (
    <div>
      <ul>{items}</ul>
    </div>
  );
}
