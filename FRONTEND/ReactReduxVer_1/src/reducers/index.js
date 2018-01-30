import { combineReducers } from 'redux';
import NotiReducer from './users/notiReducer';
import AppReducer from './appReducer';

const rootReducer = combineReducers({
  noties: NotiReducer,
  app: AppReducer
});

export default rootReducer;
