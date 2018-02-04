"use strict";

import axios from 'axios';
import io from 'socket.io-client';

export const FETCH_NOTIES_POLLING = 'FETCH_NOTIES_POLLING';
export const FETCH_NEW_MESSAGE = 'FETCH_NEW_MESSAGE';
export const SET_WEB_NOTIFY_ENABLE = 'SET_WEB_NOTIFY_ENABLE';
export const SET_WEB_NOTIFY_UNABLE = 'SET_WEB_NOTIFY_UNABLE';
export const SET_SOCKET_CONNECTED = 'SET_SOCKET_CONNECTED';

const API_URL = 'http://127.0.0.1:3001/api/users/long_poll_noti';
const CHAT_URL = 'http://127.0.0.1:4000/api/message';
const token = JSON.parse(localStorage.getItem('token'));

export function dataFetch() {
  const request = axios.get(API_URL, {headers: {'token' : token}});

  return {    
    type: FETCH_NOTIES_POLLING,
    payload: request
  };
}

export function getNewMessage(messageIdx) {
  const request = axios.get(`${CHAT_URL}/${messageIdx}`, {headers: {'token' : token}});

  return{
    type: FETCH_NEW_MESSAGE,
    payload: request
  };
}

export function setSocketConnected() {
  let socket = null;
  if(localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
    socket = io('http://localhost:4002', {transports: ['websocket', 'polling', 'flashsocket']});

    socket.on('connect', function() {
      socket.emit('storeClientInfo', { customId: parseInt(JSON.parse(localStorage.getItem('profile')).idx) });
      console.log('[Appactions] socket-connected : ', parseInt(JSON.parse(localStorage.getItem('profile')).idx));
    });
  }
  
  return {
    type: SET_SOCKET_CONNECTED,
    payload: socket
  };
}

export function setWebNotifyEnable() {
  return {
    type: SET_WEB_NOTIFY_ENABLE
  };
}

export function setWebNotifyUnable() {
  return {
    type: SET_WEB_NOTIFY_UNABLE
  };
}