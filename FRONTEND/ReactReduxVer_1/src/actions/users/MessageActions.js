"use strict";

import axios from 'axios';

export const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
export const GET_MESSAGES = 'GET_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_RESPONSE = 'SEND_RESONSE';

const ROOT_URL = 'http://localhost:4000/api/messages';
const token = JSON.parse(localStorage.getItem('token')); 
    
export function getConversations(){
  const request = axios.get(`${ROOT_URL}`, {headers: {'token' : token}});

  return {
    type: GET_CONVERSATIONS,
    payload: request
  }
}

export function getMessages(conversationIdx){
  const request = axios.get(`${ROOT_URL}/${conversationIdx}`, {headers: {'token' : token}});
  
  return {
    type: GET_MESSAGES,
    payload: request
  }
}

export function sendMessage(){
  return {
    type: GET_MESSEND_MESSAGE
  }
}

export function sendResponse(message){
  return {
  }
}