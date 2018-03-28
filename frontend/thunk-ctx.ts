import {API} from './lib/api';

export class ThunkContext {
  constructor(readonly api: API) {}
}
