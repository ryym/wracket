import {Bookmark, BookmarkStatus} from '../../lib/models';
import {updateObj} from '../../lib/obj';
import {BookmarkState, newBookmarkState} from '../../state';
import {Action} from '../../action';

export function reduceBookmarks(
  bks: BookmarkState = newBookmarkState(),
  action: Action,
): BookmarkState {
  switch (action.type) {
    case 'SYNC_BOOKMARKS_START':
    case 'LOAD_MORE_BOOKMARKS_START':
      return {
        ...bks,
        nowLoading: true,
      };

    case 'SYNC_BOOKMARKS_OK':
      return {
        ...bks,
        shownIds: [],
        byId: action.bookmarks,
        nowLoading: false,
      };

    case 'LOAD_MORE_BOOKMARKS_OK': {
      const isEmpty = Object.keys(action.bookmarks).length === 0;
      return {
        ...bks,
        byId: isEmpty ? bks.byId : {...bks.byId, ...action.bookmarks},
        nowLoading: false,
      };
    }

    case 'UPDATE_SHOWN_BOOKMARKS':
      return {
        ...bks,
        shownIds: action.ids,
      };

    case 'OPEN_BOOKMARK':
      return {
        ...bks,
        byId: updateObj(bks.byId, action.id, changeStatus(BookmarkStatus.Reading)),
      };

    case 'RESET_OPEN_BOOKMARK':
      return {
        ...bks,
        byId: updateObj(bks.byId, action.id, changeStatus(BookmarkStatus.Unread)),
      };

    case 'FAVORITE_BOOKMARK_START':
      return {
        ...bks,
        byId: updateObj(bks.byId, action.id, b => ({
          ...b,
          favorite: true,
        })),
      };

    case 'FAVORITE_BOOKMARK_OK':
      return {
        ...bks,
        byId: updateObj(bks.byId, action.id, b => ({...b, favoritedAt: action.favoritedAt})),
      };

    case 'FAVORITE_BOOKMARK_ERR':
      return {
        ...bks,
        byId: updateObj(bks.byId, action.id, b => ({...b, favorite: false})),
      };

    case 'UNFAVORITE_BOOKMARK_START':
      return {
        ...bks,
        byId: updateObj(bks.byId, action.id, b => ({...b, favorite: false})),
      };

    case 'UNFAVORITE_BOOKMARK_ERR':
      return {
        ...bks,
        byId: updateObj(bks.byId, action.id, b => ({...b, favorite: true})),
      };

    default:
      return bks;
  }
}

const changeStatus = (status: BookmarkStatus) => (b: Bookmark): Bookmark =>
  b.status === status ? b : {...b, status};
