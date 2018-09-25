import {
  Bookmark,
  BookmarkById,
  BookmarkStatus,
  SearchCondition,
  User,
  SyncStatus,
} from './lib/models';
import {conditionToQuery} from './lib/search-query';

export interface State {
  readonly user: UserState;
  readonly bookmarks: BookmarkState;
  readonly search: SearchState;
  readonly errors: ErrorsState;
}

export const newState = (): State => ({
  user: newUser(),
  bookmarks: newBookmarkState(),
  search: newSearchState(),
  errors: newErrorsState(),
});

export type UserState = Readonly<User>;

export const newUser = (): UserState => ({
  syncStatus: SyncStatus.Done,
});

export interface BookmarkState {
  readonly shownIds: string[];
  readonly byId: {
    readonly [id: string]: Bookmark;
  };
  readonly nowLoading: boolean;
}

export const newBookmarkState = (bks?: BookmarkById): BookmarkState => {
  return {
    shownIds: [],
    byId: bks || {},
    nowLoading: false,
  };
};

export interface SearchState {
  readonly condition: SearchCondition;
  readonly currentQuery: string;
  readonly stateByQuery: SearchStateByQuery;
  readonly panelCollapsible: boolean;
}

export interface SearchStateByQuery {
  readonly [query: string]: QueryState;
}

export interface QueryState {
  readonly count: number | null;
  readonly allFetched: boolean;
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
    panelCollapsible: true,
  };
};

export interface ErrorsState {
  readonly err: Error | null;
}

export const newErrorsState = (): ErrorsState => ({err: null});
