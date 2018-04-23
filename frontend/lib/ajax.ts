import axios, {AxiosInstance, AxiosResponse} from 'axios';

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';

export interface AjaxOption {
  method?: Method;
  headers?: {};
  params?: {};
}

export interface AjaxInitConfig {
  baseURL: string;
  headers?: {};
}

export interface Ajax {
  <T = void>(path: string, opt: AjaxOption): Promise<Response<T>>;
}

type AxiosCreator = (conf: AjaxInitConfig) => AxiosInstance;
const createAxios: AxiosCreator = conf => axios.create(conf);

export function createAjax(conf: AjaxInitConfig, newAxios: AxiosCreator = createAxios): Ajax {
  const axios = newAxios(conf);
  return async function ajax<T>(path: string, opt: AjaxOption) {
    try {
      const res = (await axios(path, opt)) as AxiosResponse<T>;
      return newResponse(res);
    } catch (err) {
      if (err.response != null) {
        return newResponse(err.response);
      }
      throw err;
    }
  };
}

export class Response<T> {
  readonly isSuccess: boolean;

  constructor(
    readonly data: T,
    readonly status: number,
    readonly statusText: string,
    readonly headers: {} = {},
  ) {
    this.isSuccess = 200 <= status && status < 300;
  }

  toString() {
    const content: string = typeof this.data === 'string' ? this.data : JSON.stringify(this.data);
    return `${this.status} ${this.statusText}: ${content}`;
  }
}

function newResponse<T>(res: AxiosResponse<T>): Response<T> {
  return new Response(res.data, res.status, res.statusText, res.headers);
}
