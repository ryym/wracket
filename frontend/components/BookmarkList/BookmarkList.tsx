import * as React from 'react';
import {IS_DEVELOPMENT} from '../../consts';
import {Bookmark} from '../../lib/models';
import {BookmarkItem, ItemProps} from './BookmarkItem';
import {Button} from '../form/Button';

const cls = require('./BookmarkList_styles.scss');

export type Props = {
  readonly bookmarks: Bookmark[];
  readonly onLoadMoreClick?: () => void;
  readonly className?: string;
} & ItemProps;

export function BookmarkList({bookmarks, onLoadMoreClick, className = '', ...itemProps}: Props) {
  const items = bookmarks.map(b => {
    return (
      <li key={b.id} className={cls.listItem} {...(IS_DEVELOPMENT ? {'data-id': b.id} : {})}>
        <BookmarkItem bookmark={b} {...itemProps} />
      </li>
    );
  });

  return (
    <div className={className}>
      <ul className={cls.list}>{items}</ul>
      {/* Should load more automatically on scroll. */}
      {onLoadMoreClick && (
        <div className={cls.loadMore}>
          <Button outlined onClick={onLoadMoreClick}>
            more
          </Button>
        </div>
      )}
    </div>
  );
}
