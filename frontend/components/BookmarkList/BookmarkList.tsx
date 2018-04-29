import React from 'react';
import {IS_DEVELOPMENT} from '../../consts';
import {Bookmark, BookmarkStatus} from '../../lib/models';

export interface Props {
  readonly bookmarks: Bookmark[];
  readonly onBookmarkOpen?: (b: Bookmark) => void;
  readonly onBackToUnread?: (b: Bookmark) => void;
  readonly onFavoriteToggle?: (b: Bookmark, favorite: boolean) => void;
}

const noop = () => {};

export function BookmarkList({
  bookmarks,
  onBookmarkOpen = noop,
  onBackToUnread = noop,
  onFavoriteToggle = noop,
}: Props) {
  const items = bookmarks.map(b => {
    return (
      <li key={b.id} {...(IS_DEVELOPMENT ? {'data-id': b.id} : {})}>
        <a href={b.url} target="_blank" onClick={() => onBookmarkOpen(b)}>
          {b.title || b.url}
        </a>
        <div>
          {b.status === BookmarkStatus.Reading && (
            <button onClick={() => onBackToUnread(b)}>unread</button>
          )}
          <button onClick={() => onFavoriteToggle(b, !b.favorite)}>
            {b.favorite ? 'unfavorite' : 'favorite'}
          </button>
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
