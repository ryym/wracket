import {Bookmark, Bookmarks} from './lib/models';

export interface State {
  readonly bookmarks: BookmarkState;
}

export interface BookmarkState extends Bookmarks {
  readonly nowLoading: boolean;
}
