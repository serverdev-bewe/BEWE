import { combineReducers } from 'redux';
import NotiReducer from './users/notiReducer';

const rootReducer = combineReducers({
  notifications: NotiReducer
});

export default rootReducer;
