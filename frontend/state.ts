import {Bookmark} from './lib/models';

export interface State {
  readonly bookmarks: Bookmarks;
}

export interface Bookmarks {
  readonly ids: number[];
  readonly byId: {
    [id: number]: Bookmark;
  };
}
