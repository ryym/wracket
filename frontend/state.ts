import {Bookmark} from './lib/models';

export interface State {
  readonly counter: Counter;
  readonly bookmarks: Bookmarks;
}

export interface Counter {
  readonly count: number;
}

export interface Bookmarks {
  readonly ids: number[];
  readonly byId: {
    [id: number]: Bookmark;
  };
}
