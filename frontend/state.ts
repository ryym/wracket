import {Bookmark, BookmarkById, BookmarkStatus, SearchCondition} from './lib/models';

export interface State {
  readonly bookmarks: BookmarkState;
  readonly searchCondition: SearchCondition;
}

export interface BookmarkState {
  readonly nowLoading: boolean;
  readonly byId: {
    readonly [id: string]: Bookmark;
  };
}

export const newBookmarkState = (bks?: BookmarkById): BookmarkState => {
  return {
    byId: bks || {},
    nowLoading: false,
  };
};

export const newSearchConditionState = (): SearchCondition => ({
  statuses: [BookmarkStatus.Unread, BookmarkStatus.Reading],
});
