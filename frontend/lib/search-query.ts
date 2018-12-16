import {SearchCondition, StatusFilter} from './models';

export const conditionToQuery = (cdtn: SearchCondition): string => {
  return `statusFilter=${cdtn.statusFilter}`;
};

export const queryToCondition = (query: string): SearchCondition => {
  if (query.startsWith('?')) {
    query = query.substr(1);
  }

  let statusFilter: StatusFilter = StatusFilter.New;
  query.split('&').forEach(part => {
    const [key, value] = part.split('=');
    if (key === 'statusFilter') {
      let filter = convertToStatusFilter(value);
      if (filter != null) {
        statusFilter = filter;
      }
    }
  });

  return {statusFilter};
};

const convertToStatusFilter = (filter: string): StatusFilter | null => {
  const values = Object.keys(StatusFilter).map((key: any) => StatusFilter[key]) as StatusFilter[];
  return values.find(v => v === filter) || null;
};
