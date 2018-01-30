import { combineReducers } from 'redux';

import NotiReducer from './users/NotiReducer';
import AppReducer from './AppReducer';
import FriendReducer from './users/FriendReducer';
import UserReducer from './users/UserReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer,
  noties: NotiReducer,
  friends: FriendReducer
});

export default rootReducer;
