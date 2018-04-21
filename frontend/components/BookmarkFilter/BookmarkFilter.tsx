import React from 'react';
import {SearchCondition, BookmarkStatus} from '../../lib/models';

type ChangeHandler = (cdtn: Partial<SearchCondition>) => void;

export interface Props {
  condition: SearchCondition;
  onConditionChange: ChangeHandler;
}

interface StatusFilter {
  name: string;
  statuses: BookmarkStatus[];
}

const eqStatuses = (s1: BookmarkStatus[], s2: BookmarkStatus[]) =>
  s1.length === s2.length && s1.every((s, i) => s === s2[i]);

const statusFilters = [
  {
    name: 'new',
    statuses: [BookmarkStatus.Reading, BookmarkStatus.Unread],
  },
  {
    name: 'reading',
    statuses: [BookmarkStatus.Reading],
  },
  {
    name: 'archived',
    statuses: [BookmarkStatus.Archived],
  },
  {
    name: 'all',
    statuses: [BookmarkStatus.Unread, BookmarkStatus.Reading, BookmarkStatus.Archived],
  },
];

export function BookmarkFilter({condition: cdtn, onConditionChange}: Props) {
  const change = (cdtn: Partial<SearchCondition>) => () => onConditionChange(cdtn);
  return (
    <div>
      {statusFilters.map(({name, statuses}) => {
        return (
          <label key={name}>
            <input
              type="radio"
              name="status"
              value={name}
              checked={eqStatuses(statuses, cdtn.statuses)}
              onChange={change({statuses})}
            />
            {name}
          </label>
        );
      })}
    </div>
  );
}
