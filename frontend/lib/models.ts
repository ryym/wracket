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
  readonly thumbnailUrl: string | null;
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
