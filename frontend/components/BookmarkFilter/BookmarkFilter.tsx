import React from 'react';
import {SearchCondition, BookmarkStatus} from '../../lib/models';

type ChangeHandler = (cdtn: Partial<SearchCondition>) => void;

export interface Props {
  condition: SearchCondition;
  onConditionChange: ChangeHandler;
}

export function BookmarkFilter({condition: cdtn, onConditionChange}: Props) {
  const change = (cdtn: Partial<SearchCondition>) => () => onConditionChange(cdtn);
  return (
    <div>
      Status:
      <label>
        <input
          type="radio"
          name="status"
          value={BookmarkStatus.Unread}
          checked={cdtn.statuses.includes(BookmarkStatus.Unread)}
          onChange={change({statuses: [BookmarkStatus.Unread]})}
        />Unread
      </label>
      <label>
        <input
          type="radio"
          name="status"
          value={BookmarkStatus.Archived}
          checked={cdtn.statuses.includes(BookmarkStatus.Archived)}
          onChange={change({statuses: [BookmarkStatus.Archived]})}
        />Archived
      </label>
    </div>
  );
}
