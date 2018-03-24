import {Bookmarks} from '../../state';
import {Action} from '../../action';

const init: Bookmarks = {
  ids: [],
  byId: {},
};

export function reduceBookmarks(bks: Bookmarks = init, action: Action): Bookmarks {
  switch (action.type) {
    default:
      return bks;
  }
}
