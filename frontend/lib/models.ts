export enum BookmarkStatus {
  Unread = 'unread',
  Reading = 'reading',
  Archived = 'archived',
}

export interface Bookmark {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly status: BookmarkStatus;
  readonly addedAt: number;
}

export interface BookmarkById {
  readonly [id: string]: Bookmark;
}

export interface SearchCondition {
  readonly statuses: BookmarkStatus[];
}
