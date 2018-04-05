import {Bookmark, Bookmarks, SearchCondition} from './lib/models';

export interface State {
  readonly bookmarks: BookmarkState;
  readonly searchCondition: SearchCondition;
}

export interface BookmarkState extends Bookmarks {
  readonly nowLoading: boolean;
}
