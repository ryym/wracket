import * as React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {IS_DEVELOPMENT} from '../../consts';
import {Bookmark} from '../../lib/models';
import {BookmarkItem, ItemProps} from './BookmarkItem';
import {Button} from '../form/Button';

const cls = require('./BookmarkList.scss');

export type Props = {
  readonly bookmarks: Bookmark[];
  readonly onLoadMoreClick?: () => void;
  readonly className?: string;
} & ItemProps;

export function BookmarkList({bookmarks, onLoadMoreClick, className = '', ...itemProps}: Props) {
  return (
    <div className={className}>
      <TransitionGroup component={'ul'} className={cls.list}>
        {bookmarks.map(b => (
          <CSSTransition key={b.id} timeout={160} classNames="g-BookmarkList-item">
            <li className={cls.listItem} {...(IS_DEVELOPMENT ? {'data-id': b.id} : {})}>
              <BookmarkItem bookmark={b} {...itemProps} />
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>

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
