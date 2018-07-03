import * as React from 'react';
import {IS_DEVELOPMENT} from '../../consts';
import {Bookmark} from '../../lib/models';
import {BookmarkItem, ItemProps} from './BookmarkItem';

const cls = require('./BookmarkList_styles.scss');

export type Props = {
  readonly bookmarks: Bookmark[];
  readonly className?: string;
} & ItemProps;

export function BookmarkList({bookmarks, className = '', ...itemProps}: Props) {
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
    </div>
  );
}
