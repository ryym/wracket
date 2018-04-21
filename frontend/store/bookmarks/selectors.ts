import {State} from '../../state';
import {Bookmark} from '../../lib/models';
import {iter} from '../../lib/iter';
import {filterBookmarks, sortBookmarks} from '../../lib/bookmark-lister';

// TODO: Memoize.
export const listBookmarks = ({bookmarks, search}: State): Bookmark[] => {
  const bks = iter(Object.keys(bookmarks.byId))
    .map(id => bookmarks.byId[id]!)
    .use(filterBookmarks(search.condition))
    .collect();
  return sortBookmarks(bks, search.condition);
};
