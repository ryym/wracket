import {iter, Iter} from './iter';
import {
  Bookmark,
  BookmarkById,
  BookmarkStatus,
  SearchCondition,
  getStatusesFromFilter,
} from './models';

// TODO: Use iterator more efficiently.
export const selectShownIds = (
  byId: BookmarkById,
  cdtn: SearchCondition,
  count: number | null = null,
): string[] => {
  const statuses = getStatusesFromFilter(cdtn.statusFilter);

  const bks = iter(Object.keys(byId))
    .map(id => byId[id]!)
    .use(filterBookmarks(statuses))
    .collect();

  const sorted = sortBookmarks(bks, statuses);

  return (count ? sorted.slice(0, count) : sorted).map(b => b.id);
};

export const filterBookmarks = (statuses: Array<BookmarkStatus>) => {
  const statusesSet = new Set(statuses);
  return (it: Iter<Bookmark>): Iter<Bookmark> => {
    return it.filter(b => statusesSet.has(b.status));
  };
};

// in-place sort
export const sortBookmarks = (bks: Bookmark[], statuses: Array<BookmarkStatus>): Bookmark[] => {
  if (statuses.length === 1 && statuses[0] === BookmarkStatus.Archived) {
    return bks.sort((b1, b2) => (b2.archivedAt || 0) - (b1.archivedAt || 0));
  }
  return bks.sort((b1, b2) => b2.addedAt - b1.addedAt);
};
