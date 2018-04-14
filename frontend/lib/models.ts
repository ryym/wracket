export enum BookmarkStatus {
  Unread = 'unread',
  Reading = 'reading',
  Archived = 'archived',
}

export interface Bookmark {
  readonly id: number;
  readonly title: string;
  readonly url: string;
  readonly status: BookmarkStatus;
}

export interface Bookmarks {
  readonly ids: number[];
  readonly byId: {
    readonly [id: number]: Bookmark;
  };
}

export interface SearchCondition {
  readonly status: BookmarkStatus;
}
