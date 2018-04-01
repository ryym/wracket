export interface Bookmark {
  readonly id: number;
  readonly title: string;
  readonly url: string;
}

export interface Bookmarks {
  readonly ids: number[];
  readonly byId: {
    readonly [id: number]: Bookmark;
  };
}
