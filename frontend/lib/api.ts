import {Ajax, createAjax, Response} from './ajax';
import {Bookmark, BookmarkById, SearchCondition, UnixTime} from '../lib/models';

export interface SearchResult {
  bookmarks: BookmarkById;
  isLast: boolean;
}

export interface FavoriteResult {
  favoritedAt: UnixTime;
}

const createDefaultAjax = (csrfToken: string): Ajax =>
  createAjax({baseURL: '/api/', headers: {'X-CSRF-Token': csrfToken}});

export class API {
  private ajax: Ajax;

  constructor(csrfToken: string, ajax: Ajax = createDefaultAjax(csrfToken)) {
    this.ajax = ajax;
  }

  async ping(name: string): Promise<Response<{hello: string}>> {
    return await this.ajax<{hello: string}>('/ping', {method: 'get', params: {name}});
  }

  async synchronize(cdtn: SearchCondition): Promise<BookmarkById | null> {
    const res = await this.ajax<BookmarkById>('/bookmarks/sync', {method: 'put', params: cdtn});
    if (!res.isSuccess) {
      throw new Error(`failed to synchronize bookmarks: ${res}`);
    }
    return res.data;
  }

  async search(cdtn: SearchCondition, last: Bookmark | null = null): Promise<SearchResult | null> {
    let params: {} = cdtn;
    if (last != null) {
      params = {...params, offset: last.addedAt};
    }
    const res = await this.ajax<SearchResult>('/bookmarks/search', {params});
    if (!res.isSuccess) {
      throw new Error(`failed to search bookmarks: ${res}`);
    }
    return res.data;
  }

  async openBookmark(bookmarkId: string): Promise<{} | null> {
    const res = await this.ajax<{}>(`/bookmarks/${bookmarkId}/open`, {method: 'put'});
    if (!res.isSuccess) {
      throw new Error(`failed to mark bookmark ${bookmarkId} as opened: ${res}`);
    }
    return {};
  }

  async resetOpenBookmark(bookmarkId: string): Promise<{} | null> {
    const res = await this.ajax<{}>(`/bookmarks/${bookmarkId}/reset_open`, {method: 'put'});
    if (!res.isSuccess) {
      throw new Error(`failed to reset bookmark ${bookmarkId} open: ${res}`);
    }
    return {};
  }

  async favoriteBookmark(bookmarkId: string): Promise<FavoriteResult | null> {
    const res = await this.ajax<FavoriteResult | null>(`/bookmarks/${bookmarkId}/favorite`, {
      method: 'put',
    });
    if (!res.isSuccess) {
      throw new Error(`failed to favorite bookmark ${bookmarkId}: ${res}`);
    }
    return res.data;
  }

  async unfavoriteBookmark(bookmarkId: string): Promise<{} | null> {
    const res = await this.ajax<{} | null>(`/bookmarks/${bookmarkId}/unfavorite`, {
      method: 'put',
    });
    if (!res.isSuccess) {
      throw new Error(`failed to unfavorite bookmark ${bookmarkId}: ${res}`);
    }
    return {};
  }
}

export function createAPI(csrfToken: string): API {
  return new API(csrfToken);
}
