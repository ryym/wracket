import {Action} from '../../action';
import {newUser, UserState} from '../../state';

export function reduceUser(user: UserState = newUser(), action: Action): UserState {
  switch (action.type) {
    case 'LOAD_MORE_BOOKMARKS_OK':
      if (action.syncStatus !== user.syncStatus) {
        return {
          ...user,
          syncStatus: action.syncStatus,
        };
      }
      return user;
  }
  return user;
}
