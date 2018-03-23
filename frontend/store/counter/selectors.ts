import {State} from '../../state';

export const getCount = (s: State): number => s.counter.count;
