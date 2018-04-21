import {Ajax, createAjax, Response} from './ajax';
import {BookmarkById, SearchCondition} from '../lib/models';

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

  async search(cdtn: SearchCondition): Promise<BookmarkById | null> {
    const res = await this.ajax<BookmarkById>('/bookmarks/search', {params: cdtn});
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
}

export function createAPI(csrfToken: string): API {
  return new API(csrfToken);
}
