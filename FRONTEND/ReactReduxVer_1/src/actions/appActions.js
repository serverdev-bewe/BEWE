"use strict";

import axios from 'axios';

export const FETCH_NOTIES = 'FETCH_NOTIES';
export const SET_WEB_NOTIFY_ENABLE = 'SET_WEB_NOTIFY_ENABLE';
export const SET_WEB_NOTIFY_UNABLE = 'SET_WEB_NOTIFY_UNABLE';

const API_URL = 'http://127.0.0.1:3001/api/users/long_poll_noti';

export function dataFetch() {
  const request = axios.get(API_URL, {headers: {'token' : JSON.parse(localStorage.getItem('token'))}});

  console.log("dataFetch", request);

  return {    
    type: FETCH_NOTIES,
    payload: request
  }
}

export function setWebNotifyEnable() {
  return {
    type: SET_WEB_NOTIFY_ENABLE,
    payload: true
  }
}

export function setWebNotifyUnable() {
  return {
    type: SET_WEB_NOTIFY_UNABLE,
    payload: false
  }
}