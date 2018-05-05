import {memoize} from './memoize';
import {findCSRFToken} from './csrf-token';
import {Ajax, createAjax} from './ajax';
import {Bookmark, BookmarkById, SearchCondition, UnixTime} from '../lib/models';

const getCSRFToken = memoize(() => {
  const token = findCSRFToken();
  if (token == null) {
    throw new Error('CSRF token not found');
  }
  return token;
});

const createDefaultAjax = (csrfToken: string = getCSRFToken()): Ajax =>
  createAjax({baseURL: '/api/', headers: {'X-CSRF-Token': csrfToken}});

const getAjax = memoize(createDefaultAjax);

export interface SearchResult {
  bookmarks: BookmarkById;
  isLast: boolean;
}

export interface FavoriteResult {
  favoritedAt: UnixTime;
}

export async function synchronize(
  cdtn: SearchCondition,
  ajax = getAjax(),
): Promise<BookmarkById | null> {
  const res = await ajax<BookmarkById>('/bookmarks/sync', {
    method: 'put',
    params: cdtn,
  });
  if (!res.isSuccess) {
    throw new Error(`failed to synchronize bookmarks: ${res}`);
  }
  return res.data;
}

export async function search(
  cdtn: SearchCondition,
  last: Bookmark | null = null,
  ajax = getAjax(),
): Promise<SearchResult | null> {
  let params: {} = cdtn;
  if (last != null) {
    params = {...params, offset: last.addedAt};
  }
  const res = await ajax<SearchResult>('/bookmarks/search', {params});
  if (!res.isSuccess) {
    throw new Error(`failed to search bookmarks: ${res}`);
  }
  return res.data;
}

export async function openBookmark(bookmarkId: string, ajax = getAjax()): Promise<{} | null> {
  const res = await ajax<{}>(`/bookmarks/${bookmarkId}/open`, {method: 'put'});
  if (!res.isSuccess) {
    throw new Error(`failed to mark bookmark ${bookmarkId} as opened: ${res}`);
  }
  return {};
}

export async function resetOpenBookmark(bookmarkId: string, ajax = getAjax()): Promise<{} | null> {
  const res = await ajax<{}>(`/bookmarks/${bookmarkId}/reset_open`, {method: 'put'});
  if (!res.isSuccess) {
    throw new Error(`failed to reset bookmark ${bookmarkId} open: ${res}`);
  }
  return {};
}

export async function favoriteBookmark(
  bookmarkId: string,
  ajax = getAjax(),
): Promise<FavoriteResult | null> {
  const res = await ajax<FavoriteResult | null>(`/bookmarks/${bookmarkId}/favorite`, {
    method: 'put',
  });
  if (!res.isSuccess) {
    throw new Error(`failed to favorite bookmark ${bookmarkId}: ${res}`);
  }
  return res.data;
}

export async function unfavoriteBookmark(bookmarkId: string, ajax = getAjax()): Promise<{} | null> {
  const res = await ajax<{} | null>(`/bookmarks/${bookmarkId}/unfavorite`, {
    method: 'put',
  });
  if (!res.isSuccess) {
    throw new Error(`failed to unfavorite bookmark ${bookmarkId}: ${res}`);
  }
  return {};
}
