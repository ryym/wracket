import {Bookmark, Bookmarks, BookmarkStatus, SearchCondition} from './lib/models';

export interface State {
  readonly bookmarks: BookmarkState;
  readonly searchCondition: SearchCondition;
}

export interface BookmarkState extends Bookmarks {
  readonly nowLoading: boolean;
}

export const newBookmarkState = (bks?: Bookmarks): BookmarkState => {
  if (bks !== undefined) {
    return {...bks, nowLoading: false};
  }
  return {
    ids: [],
    byId: {},
    nowLoading: false,
  };
};

export const newSearchConditionState = (): SearchCondition => ({
  statuses: [BookmarkStatus.Unread, BookmarkStatus.Reading],
});
