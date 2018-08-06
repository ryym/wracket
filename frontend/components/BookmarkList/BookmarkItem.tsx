import * as React from 'react';
import {Bookmark, BookmarkStatus} from '../../lib/models';
import {IconButton} from '../form/IconButton';
import {Thumbnail} from './Thumbnail';

const cls = require('./BookmarkItem_styles.scss');

export type ItemProps = {
  readonly onBookmarkOpen?: (b: Bookmark) => void;
  readonly onBackToUnread?: (b: Bookmark) => void;
  readonly onFavoriteToggle?: (b: Bookmark, favorite: boolean) => void;
  readonly onArchiveClick?: (b: Bookmark) => void;
  readonly onReaddClick?: (b: Bookmark) => void;
  readonly onDeleteClick?: (b: Bookmark) => void;
};

export type Props = ItemProps & {
  readonly bookmark: Bookmark;
};

type State = {
  actionsOpen: boolean;
};

const noop = () => {};

export class BookmarkItem extends React.PureComponent<Props, State> {
  state = {
    actionsOpen: false,
  };

  toggleActions = () => {
    this.setState({actionsOpen: !this.state.actionsOpen});
  };

  render() {
    const {
      bookmark: b,
      onBookmarkOpen = noop,
      onBackToUnread = noop,
      onFavoriteToggle = noop,
      onArchiveClick = noop,
      onReaddClick = noop,
      onDeleteClick = noop,
    } = this.props;
    const {actionsOpen} = this.state;
    const isArchived = b.status === BookmarkStatus.Archived;
    return (
      <>
        <div className={cls.itemLinkContainer}>
          <a
            href={b.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className={cls.itemLink}
            onClick={() => onBookmarkOpen(b)}
          >
            <div className={cls.itemThumbnail}>
              <Thumbnail src={b.thumbnailUrl} />
            </div>
            <div className={cls.itemLinkText}>
              <span className={cls.itemTitle}>{b.title || b.url}</span>
              <span className={cls.itemDomain}>{new URL(b.url).hostname}</span>
            </div>
          </a>
          <div className={cls.actionsOpener}>
            <IconButton
              className={cls.actionOpenerButton}
              content={actionsOpen ? 'expand_less' : 'expand_more'}
              label=""
              onClick={this.toggleActions}
            />
          </div>
        </div>
        <div className={`${cls.actions} ${actionsOpen ? cls.isOpen : ''}`}>
          {b.status === BookmarkStatus.Reading && (
            <IconButton
              className={cls.action}
              content="undo"
              label="Back to unread"
              onClick={() => onBackToUnread(b)}
            />
          )}
          {isArchived && (
            <IconButton
              className={cls.action}
              content="add"
              label="Readd bookmark"
              onClick={() => onReaddClick(b)}
            />
          )}
          {!isArchived && (
            <IconButton
              className={cls.action}
              content="done"
              label="Archive bookmark"
              onClick={() => onArchiveClick(b)}
            />
          )}
          <IconButton
            className={cls.action}
            content="delete"
            label="Delete bookmark"
            onClick={() => confirm('delete permanently?') && onDeleteClick(b)}
          />
          <IconButton
            className={`${cls.action} ${b.favorite ? cls.isFavorite : ''}`}
            content="star"
            label={b.favorite ? 'Remove bookmark from favrites' : 'Add bookmark to favorites'}
            onClick={() => {
              onFavoriteToggle(b, !b.favorite);
            }}
          />
        </div>
      </>
    );
  }
}
