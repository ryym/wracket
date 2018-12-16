import {SearchCondition} from './models';

export const conditionToQuery = (cdtn: SearchCondition): string => {
  return `&statusFilter=${cdtn.statusFilter}`;
};
