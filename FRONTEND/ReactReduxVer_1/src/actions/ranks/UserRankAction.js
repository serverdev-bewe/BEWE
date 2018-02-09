"use strict";

import axios from 'axios';

export const FETCH_USER_HAS_GAMES_RANK = 'FETCH_USER_HAS_GAMES_RANK';

const API_URL = 'http://127.0.0.1:3001/api/ranks';

export function fetchUserHasGameRank(){
  const request = axios.get(`${API_URL}/users/buy`);
  
  return{
    type: FETCH_USER_HAS_GAMES_RANK,
    payload: request
  };
}