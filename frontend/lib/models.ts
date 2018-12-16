export enum SyncStatus {
  NotYet = 'not_yet',
  Syncing = 'syncing',
  Done = 'done',
}

export interface User {
  syncStatus: SyncStatus;
}

export enum BookmarkStatus {
  Unread = 'unread',
  Reading = 'reading',
  Archived = 'archived',
  Deleted = 'deleted',
}

export enum StatusFilter {
  New = 'new',
  Reading = 'reading',
  Archived = 'archived',
  All = 'all',
}

export const getStatusesFromFilter = (filter: StatusFilter): Array<BookmarkStatus> => {
  switch (filter) {
    case StatusFilter.New:
      return [BookmarkStatus.Unread, BookmarkStatus.Reading];
    case StatusFilter.Reading:
      return [BookmarkStatus.Reading];
    case StatusFilter.Archived:
      return [BookmarkStatus.Archived];
    case StatusFilter.All:
      return [BookmarkStatus.Unread, BookmarkStatus.Reading, BookmarkStatus.Archived];
  }
};

// We represents a timestamp by just a number for now.
export type UnixTime = number;

export interface Bookmark {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly thumbnailUrl: string;
  readonly status: BookmarkStatus;
  readonly addedAt: UnixTime;
  readonly archivedAt: UnixTime | null;
  readonly favorite: boolean;
}

export interface BookmarkById {
  readonly [id: string]: Bookmark;
}

export interface SearchCondition {
  readonly statusFilter: StatusFilter;
  readonly sortKey: SortKey;
}

export enum SortKey {
  AddedAt = 'addedAt',
  ArchivedAt = 'archivedAt',
}
