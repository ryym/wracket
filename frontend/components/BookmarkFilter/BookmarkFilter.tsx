import * as React from 'react';
import * as classNames from 'classnames';
import Radio, {NativeRadioControl} from '@material/react-radio';
import {SearchCondition, StatusFilter, SortKey} from '../../lib/models';

const cls = require('./BookmarkFilter.scss');

type ChangeHandler = (cdtn: Partial<SearchCondition>) => void;

export interface Props {
  condition: SearchCondition;
  onConditionChange: ChangeHandler;
  collapsible?: boolean;
  onOverlayClick?: () => void;
  className?: string;
}

const statusFilters = [
  {
    label: 'New',
    filter: StatusFilter.New,
  },
  {
    label: 'Reading',
    filter: StatusFilter.Reading,
  },
  {
    label: 'Archived',
    filter: StatusFilter.Archived,
    sortKey: SortKey.ArchivedAt,
  },
  {
    label: 'All',
    filter: StatusFilter.All,
  },
];

export function BookmarkFilter({condition: cdtn, ...props}: Props) {
  const change = (cdtn: Partial<SearchCondition>) => () => props.onConditionChange(cdtn);
  const collapsible = props.collapsible !== false; // true if true or undefined.
  const rootClass = collapsible ? cls.rootCollapsible : cls.root;
  return (
    <>
      <div className={classNames(rootClass, props.className)}>
        {statusFilters.map(({label, filter, sortKey}) => {
          return (
            <div key={filter}>
              <Radio label={label} wrapperClasses={cls.filterField}>
                <NativeRadioControl
                  id={`status-${filter}`}
                  name="status"
                  value={name}
                  checked={filter === cdtn.statusFilter}
                  onChange={change({statusFilter: filter, sortKey: sortKey || SortKey.AddedAt})}
                />
              </Radio>
            </div>
          );
        })}
      </div>
      <div className={cls.overlay} onClick={props.onOverlayClick} />
    </>
  );
}
