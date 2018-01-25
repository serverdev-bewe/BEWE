import { combineReducers } from 'redux';
import NotiReducer from './users/notiReducer';

const rootReducer = combineReducers({
  noties: NotiReducer
});

export default rootReducer;
