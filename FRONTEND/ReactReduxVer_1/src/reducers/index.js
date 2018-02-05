import { combineReducers } from 'redux';

import NotiReducer from './users/NotiReducer';
import AppReducer from './AppReducer';
import FriendReducer from './users/FriendReducer';
import UserReducer from './users/UserReducer';
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
  form: formReducer,

});

export default rootReducer;
