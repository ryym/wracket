import {iter, Iter} from './iter';
import {Bookmark, BookmarkById, SearchCondition, BookmarkStatus} from './models';

// TODO: Use iterator more efficiently.
export const selectShownIds = (
  byId: BookmarkById,
  cdtn: SearchCondition,
  count: number | null = null,
): string[] => {
  const bks = iter(Object.keys(byId))
    .map(id => byId[id]!)
    .use(filterBookmarks(cdtn))
    .collect();
  const sorted = sortBookmarks(bks, cdtn);
  return (count ? sorted.slice(0, count) : sorted).map(b => b.id);
};

export const filterBookmarks = (cdtn: SearchCondition) => {
  const statuses = new Set(cdtn.statuses);
  return (it: Iter<Bookmark>): Iter<Bookmark> => {
    return it.filter(b => statuses.has(b.status));
  };
};

// in-place sort
export const sortBookmarks = (bks: Bookmark[], cdtn: SearchCondition): Bookmark[] => {
  if (cdtn.statuses.length === 1 && cdtn.statuses[0] === BookmarkStatus.Archived) {
    return bks.sort((b1, b2) => (b2.archivedAt || 0) - (b1.archivedAt || 0));
  }
  return bks.sort((b1, b2) => b2.addedAt - b1.addedAt);
};
