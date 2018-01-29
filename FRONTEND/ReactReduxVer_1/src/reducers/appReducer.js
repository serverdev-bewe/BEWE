import { FETCH_NOTIES, SET_WEB_NOTIFY_ENABLE, SET_WEB_NOTIFY_UNABLE } from '../actions/appActions.js'

const initialState = {  
  new: {},
  grant: false
};

export default function data (state = initialState, action) {  
  switch (action.type) {    
    case FETCH_NOTIES: 
      return { ...state, new: action.payload.data };
    
    case SET_WEB_NOTIFY_ENABLE:
      return { ...state, grant: payload};
    
    case SET_WEB_NOTIFY_UNABLE:
      return { ...state, grant: payload};
    
    default:
      return state;
  }
}