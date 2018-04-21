import {Bookmark, BookmarkById, BookmarkStatus, SearchCondition} from './lib/models';
import {conditionToQuery} from './lib/search-query';

export interface State {
  readonly bookmarks: BookmarkState;
  readonly search: SearchState;
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

export interface SearchState {
  readonly condition: SearchCondition;
  readonly currentQuery: string;
  readonly stateByQuery: {
    readonly [query: string]: QueryState;
  };
}

export interface QueryState {
  readonly count: number;
}

export const newSearchConditionState = (): SearchCondition => ({
  statuses: [BookmarkStatus.Unread, BookmarkStatus.Reading],
});

export const newSearchState = (): SearchState => {
  const cdtn = {
    statuses: [BookmarkStatus.Unread, BookmarkStatus.Reading],
  };
  return {
    condition: cdtn,
    currentQuery: conditionToQuery(cdtn),
    stateByQuery: {},
  };
};
