import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';  
// import messageValidation from './validation/messageValidation';

import NotiReducer from './users/NotiReducer';
import AppReducer from './AppReducer';
import FriendReducer from './users/FriendReducer';
import UserReducer from './users/UserReducer';
import MessageReducer from './users/MessageReducer';
import CMSReducer from './CMS/CMSReducer';
import StoreReducer from './store/StoreReducer';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer,
  noties: NotiReducer,
  friends: FriendReducer,
  CMS: CMSReducer,
  store: StoreReducer,
  messages: MessageReducer,
  form: formReducer,

});

export default rootReducer;
