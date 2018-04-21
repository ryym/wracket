import {SearchCondition} from './models';

export const conditionToQuery = (cdtn: SearchCondition): string => {
  if (cdtn.statuses.length === 0) {
    return '';
  }
  const statuses = cdtn.statuses.sort().join(',');
  return `&statuses=${statuses}`;
};
