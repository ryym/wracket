import {Action} from '../../action';
import {newUser, UserState} from '../../state';

export function reduceUser(user: UserState = newUser(), _action: Action): UserState {
  return user;
}
