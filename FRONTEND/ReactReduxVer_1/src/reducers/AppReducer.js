import { FETCH_NOTIES_POLLING, SET_WEB_NOTIFY_ENABLE, SET_WEB_NOTIFY_UNABLE } 
  from '../actions/AppActions.js'

let grant = '';

if(Notification.permission === 'granted') {
  grant = true;
} else {
  grant = false;
}

const initialState = {  
  new: {},
  grant: grant
};

export default function data (state = initialState, action) {  
  switch (action.type) {    
    case FETCH_NOTIES_POLLING: 
      console.log('fetch_polling');
      return { ...state, new: action.payload.data };
    
    case SET_WEB_NOTIFY_ENABLE:
      return { ...state, grant: true};
    
    case SET_WEB_NOTIFY_UNABLE:
      return { ...state, grant: false};
    
    default:
      return state;
  }
}