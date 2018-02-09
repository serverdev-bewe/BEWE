"use strict";

import axios from 'axios';

export const FETCH_GAME_HAS_USERS_RANK = 'FETCH_GAME_HAS_USERS_RANK';

const API_URL = 'http://127.0.0.1:3001/api/ranks';

export function fetchGameHasUserRank(){  
  const request = axios.get(`${API_URL}/games/buy`);
  
  return{
    type: FETCH_GAME_HAS_USERS_RANK,
    payload: request
  };
}