import { FETCH_PROFILE } from '../../actions/users/UserActions';

const INITIAL_STATE = {
  profile: ''
};

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_PROFILE:
      return { profile: action.payload.data }
      
    default:
      return state;
  }
}