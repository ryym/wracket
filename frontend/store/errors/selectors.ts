import {State} from '../../state';

export const getCurrentError = ({errors}: State): Error | null => {
  return errors.err;
};
