import {memoize} from './memoize';
import {findCSRFToken} from './csrf-token';
import {Ajax, createAjax} from './ajax';
import {BookmarkById, SearchCondition, UnixTime, SyncStatus} from '../lib/models';

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
  syncStatus: SyncStatus;
}

export interface FavoriteResult {
  favoritedAt: UnixTime;
}

export interface ArchiveResult {
  archivedAt: UnixTime;
}

export async function synchronize(cdtn: SearchCondition, ajax = getAjax()): Promise<BookmarkById> {
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
  offset: number | null = null,
  ajax = getAjax(),
): Promise<SearchResult> {
  let params: {} = cdtn;
  if (offset != null) {
    params = {...params, offset};
  }
  const res = await ajax<SearchResult>('/bookmarks/search', {params});
  if (!res.isSuccess) {
    throw new Error(`failed to search bookmarks: ${res}`);
  }
  return res.data;
}

export async function openBookmark(bookmarkId: string, ajax = getAjax()): Promise<{}> {
  const res = await ajax<{}>(`/bookmarks/${bookmarkId}/open`, {method: 'put'});
  if (!res.isSuccess) {
    throw new Error(`failed to mark bookmark ${bookmarkId} as opened: ${res}`);
  }
  return {};
}

export async function resetOpenBookmark(bookmarkId: string, ajax = getAjax()): Promise<{}> {
  const res = await ajax<{}>(`/bookmarks/${bookmarkId}/reset_open`, {method: 'put'});
  if (!res.isSuccess) {
    throw new Error(`failed to reset bookmark ${bookmarkId} open: ${res}`);
  }
  return {};
}

export async function favoriteBookmark(
  bookmarkId: string,
  ajax = getAjax(),
): Promise<FavoriteResult> {
  const res = await ajax<FavoriteResult>(`/bookmarks/${bookmarkId}/favorite`, {
    method: 'put',
  });
  if (!res.isSuccess) {
    throw new Error(`failed to favorite bookmark ${bookmarkId}: ${res}`);
  }
  return res.data;
}

export async function unfavoriteBookmark(bookmarkId: string, ajax = getAjax()): Promise<{}> {
  const res = await ajax<{}>(`/bookmarks/${bookmarkId}/unfavorite`, {
    method: 'put',
  });
  if (!res.isSuccess) {
    throw new Error(`failed to unfavorite bookmark ${bookmarkId}: ${res}`);
  }
  return {};
}

export async function archiveBookmark(
  bookmarkId: string,
  ajax = getAjax(),
): Promise<ArchiveResult> {
  const res = await ajax<ArchiveResult>(`/bookmarks/${bookmarkId}/archive`, {
    method: 'put',
  });
  if (!res.isSuccess) {
    throw new Error(`failed to archive bookmark ${bookmarkId}: ${res}`);
  }
  return res.data;
}

export async function readdBookmark(bookmarkId: string, ajax = getAjax()): Promise<{}> {
  const res = await ajax<{}>(`/bookmarks/${bookmarkId}/readd`, {method: 'put'});
  if (!res.isSuccess) {
    throw new Error(`failed to readd bookmark ${bookmarkId}: ${res}`);
  }
  return {};
}

export async function deleteBookmark(bookmarkId: string, ajax = getAjax()): Promise<{}> {
  const res = await ajax<{}>(`/bookmarks/${bookmarkId}/delete`, {method: 'put'});
  if (!res.isSuccess) {
    throw new Error(`failed to delete bookmark ${bookmarkId}: ${res}`);
  }
  return {};
}
