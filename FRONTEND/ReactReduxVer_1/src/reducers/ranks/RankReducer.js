import { FETCH_GAME_HAS_USERS_RANK } from 'actions/ranks/GameRankAction.js';
import { FETCH_USER_HAS_GAMES_RANK } from 'actions/ranks/UserRankAction.js';

const INITIAL_STATE = {
  list: []
};

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_GAME_HAS_USERS_RANK:
      return { ...state, list: action.payload.data }

    case FETCH_USER_HAS_GAMES_RANK:
      return { ...state, list: action.payload.data }
    
    default:
      return state;
  }
}