import * as React from 'react';
import {IS_DEVELOPMENT} from '../../consts';
import {Bookmark, BookmarkStatus} from '../../lib/models';
import {Styles} from '../types';

export interface Props {
  readonly styles?: Styles;
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
  styles = {},
}: Props) {
  const items = bookmarks.map(b => {
    return (
      <li className={styles.item} key={b.id} {...(IS_DEVELOPMENT ? {'data-id': b.id} : {})}>
        <a
          className="bookmark-list_bookmark"
          href={b.url}
          target="_blank"
          onClick={() => onBookmarkOpen(b)}
        >
          <div className="bookmark-list_bookmark-title">{b.title || b.url}</div>
          <div className={styles.actions}>
            {b.status === BookmarkStatus.Reading && (
              <button onClick={() => onBackToUnread(b)}>unread</button>
            )}
            <button onClick={() => onFavoriteToggle(b, !b.favorite)}>
              {b.favorite ? 'unfavorite' : 'favorite'}
            </button>
          </div>
        </a>
      </li>
    );
  });
  return (
    <div className="bookmark-list">
      <ul className="bookmark-list_list">{items}</ul>
    </div>
  );
}
