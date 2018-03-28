import {Ajax, createAjax, Response} from './ajax';

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
}

export function createAPI(csrfToken: string): API {
  return new API(csrfToken);
}
