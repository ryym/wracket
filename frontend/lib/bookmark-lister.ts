import {Iter} from './iter';
import {Bookmark, SearchCondition} from './models';

export const filterBookmarks = (cdtn: SearchCondition) => {
  const statuses = new Set(cdtn.statuses);
  return (it: Iter<Bookmark>): Iter<Bookmark> => {
    return it.filter(b => statuses.has(b.status));
  };
};

// in-place sort
export const sortBookmarks = (bks: Bookmark[], cdtn: SearchCondition): Bookmark[] => {
  return bks.sort((b1, b2) => b2.addedAt - b1.addedAt);
};
