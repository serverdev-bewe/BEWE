import '../../users.css'

import React, { Component } from 'react';
import Moment from 'react-moment';

import { Card, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

const icon = (type) => {
  if (type === 'friend') {
    return (<span className="ion-person-add noti-list-icon" />)
  }
}

const fetchOtherProfile = async (idx) => {
  let result = '';

  await axios.get(`${API_URL}/${idx}`, 
    {headers: {'token' : JSON.parse(localStorage.getItem('token'))}})
    .then((response) => {result = response});
    
  return result;
}

const Message = (props) => {
  return (
    <div>{props.message.contents}</div>
  )
}

export default Message;