import { GET_CONVERSATIONS, GET_MESSAGES, SEND_MESSAGE } from '../../actions/users/MessageActions';

const INITIAL_STATE = {
  conversations: [],
  messages: [],
  message: ''
}

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case GET_CONVERSATIONS:
      return { ...state, conversations: action.payload.data }

    case GET_MESSAGES:
      console.log('reducer : ', action.payload.data);
      return { ...state, messages: action.payload.data }
      
    case SEND_MESSAGE:
    
    default:
      return state;
  }
}