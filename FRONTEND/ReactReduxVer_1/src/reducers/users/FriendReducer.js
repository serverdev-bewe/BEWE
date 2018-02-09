import { FETCH_FRIENDS } from 'actions/users/FriendActions';

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