import { FETCH_FRIENDS, SEND_FRIEND_REQUEST, REJECT_FRIEND_REQUEST, 
  ACCEPT_FRIEND_REQUEST, CANCEL_FRIEND_REQUEST } from 'actions/users/FriendActions';

const INITIAL_STATE = {
  all: []
};

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_FRIENDS:
      return { ...state, all: action.payload.data }
        
    default:
      return state;
  }
}