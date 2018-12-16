import {SearchCondition, StatusFilter, SortKey} from './models';

export const conditionToQuery = (cdtn: SearchCondition): string => {
  return `statusFilter=${cdtn.statusFilter}&sortKey=${cdtn.sortKey}`;
};

export const queryToCondition = (query: string): SearchCondition => {
  if (query.startsWith('?')) {
    query = query.substr(1);
  }

  let statusFilter = StatusFilter.New;
  let sortKey = SortKey.AddedAt;
  query.split('&').forEach(part => {
    const [key, value] = part.split('=');
    switch (key) {
      case 'statusFilter':
        let filter = toEnumValue<StatusFilter>(StatusFilter, value);
        if (filter != null) {
          statusFilter = filter;
        }
      case 'sortKey':
        let sort = toEnumValue<SortKey>(SortKey, value);
        if (sort != null) {
          sortKey = sort;
        }
    }
  });

  return {statusFilter, sortKey};
};

// Note that this is NOT type safe.
const toEnumValue = <E>(enm: any, value: string): E | null => {
  const values: any[] = listValues(enm);
  return (values.find(v => v === value) as E) || null;
};

const listValues = <V, O>(obj: O): Array<keyof O> => {
  return Object.keys(obj).map(k => (obj as any)[k]);
};
