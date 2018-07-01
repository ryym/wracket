import * as React from 'react';
import {IS_DEVELOPMENT} from '../../consts';
import {Bookmark, BookmarkStatus} from '../../lib/models';

const cls = require('./BookmarkList_styles.scss');

export interface Props {
  readonly bookmarks: Bookmark[];
  readonly onBookmarkOpen?: (b: Bookmark) => void;
  readonly onBackToUnread?: (b: Bookmark) => void;
  readonly onFavoriteToggle?: (b: Bookmark, favorite: boolean) => void;
  readonly className?: string;
}

const noop = () => {};

export function BookmarkList({
  bookmarks,
  onBookmarkOpen = noop,
  onBackToUnread = noop,
  onFavoriteToggle = noop,
  className = '',
}: Props) {
  const items = bookmarks.map(b => {
    return (
      <li key={b.id} className={cls.listItem} {...(IS_DEVELOPMENT ? {'data-id': b.id} : {})}>
        <a
          href={b.url}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={cls.itemLink}
          onClick={() => onBookmarkOpen(b)}
        >
          <div className={cls.itemThumbnail}>
            {b.thumbnailUrl && <img alt="" src={b.thumbnailUrl} />}
            {!b.thumbnailUrl && <div className={cls.itemBlankThumbnail} />}
          </div>
          <div className={cls.itemLinkText}>
            <span className={cls.itemTitle}>{b.title || b.url}</span>
            <span className={cls.itemDomain}>{new URL(b.url).hostname}</span>
          </div>
        </a>
        <div className={cls.actions}>
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
    <div className={className}>
      <ul className={cls.list}>{items}</ul>
    </div>
  );
}
