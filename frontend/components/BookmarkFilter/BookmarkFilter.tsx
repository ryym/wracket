import * as React from 'react';
import * as classNames from 'classnames';
import {RadioField} from '../form/RadioField';
import {SearchCondition, BookmarkStatus} from '../../lib/models';

const cls = require('./BookmarkFilter.scss');

type ChangeHandler = (cdtn: Partial<SearchCondition>) => void;

export interface Props {
  condition: SearchCondition;
  onConditionChange: ChangeHandler;
  collapsible?: boolean;
  onOverlayClick?: () => void;
  className?: string;
}

const eqStatuses = (s1: BookmarkStatus[], s2: BookmarkStatus[]) =>
  s1.length === s2.length && s1.every((s, i) => s === s2[i]);

const statusFilters = [
  {
    name: 'new',
    label: 'New',
    statuses: [BookmarkStatus.Reading, BookmarkStatus.Unread],
  },
  {
    name: 'reading',
    label: 'Reading',
    statuses: [BookmarkStatus.Reading],
  },
  {
    name: 'archived',
    label: 'Archived',
    statuses: [BookmarkStatus.Archived],
  },
  {
    name: 'all',
    label: 'All',
    statuses: [BookmarkStatus.Unread, BookmarkStatus.Reading, BookmarkStatus.Archived],
  },
];

export function BookmarkFilter({condition: cdtn, ...props}: Props) {
  const change = (cdtn: Partial<SearchCondition>) => () => props.onConditionChange(cdtn);
  const collapsible = props.collapsible !== false; // true if true or undefined.
  const rootClass = collapsible ? cls.rootCollapsible : cls.root;
  return (
    <>
      <div className={classNames(rootClass, props.className)}>
        {statusFilters.map(({name, label, statuses}) => {
          return (
            <div key={name}>
              <RadioField
                id={`status-${name}`}
                name="status"
                label={label}
                value={name}
                rootClass={cls.filterField}
                checked={eqStatuses(statuses, cdtn.statuses)}
                onChange={change({statuses})}
              />
            </div>
          );
        })}
      </div>
      <div className={cls.overlay} onClick={props.onOverlayClick} />
    </>
  );
}
