import { FETCH_NOTIES } from '../../actions/users/notiActions';

const INITIAL_STATE = {
  all: []
};

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_NOTIES:
      return { ...state, all: action.payload.data }

    default:
      return state;
  }
}