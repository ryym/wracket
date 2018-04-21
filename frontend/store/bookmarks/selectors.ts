import {createSelector} from 'reselect';
import {State} from '../../state';
import {Bookmark} from '../../lib/models';
import {iter} from '../../lib/iter';
import {filterBookmarks, sortBookmarks} from '../../lib/bookmark-lister';
import {getSearchCondition} from '../search/selectors';

export const listBookmarks = createSelector(
  getSearchCondition,
  state => state.bookmarks.byId,
  (cdtn, byId) => {
    const bks = iter(Object.keys(byId))
      .map(id => byId[id]!)
      .use(filterBookmarks(cdtn))
      .collect();
    return sortBookmarks(bks, cdtn);
  },
);
