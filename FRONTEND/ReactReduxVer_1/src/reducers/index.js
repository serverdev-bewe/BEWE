import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';  
// import messageValidation from './validation/messageValidation';

import NotiReducer from './users/NotiReducer';
import AppReducer from './AppReducer';
import FriendReducer from './users/FriendReducer';
import UserReducer from './users/UserReducer';
import MessageReducer from './users/MessageReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer,
  noties: NotiReducer,
  friends: FriendReducer,
  messages: MessageReducer,
  form: formReducer
});

export default rootReducer;
