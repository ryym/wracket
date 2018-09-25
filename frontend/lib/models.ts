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

// We represents a timestamp by just a number for now.
export type UnixTime = number;

export interface Bookmark {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly thumbnailUrl: string;
  readonly status: BookmarkStatus;
  readonly addedAt: UnixTime;
  readonly favorite: boolean;
}

export interface BookmarkById {
  readonly [id: string]: Bookmark;
}

export interface SearchCondition {
  readonly statuses: BookmarkStatus[];
}
