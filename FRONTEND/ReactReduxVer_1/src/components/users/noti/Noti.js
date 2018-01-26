import '../users.css'

import React, { Component } from 'react';
import Moment from 'react-moment';
import Parser from 'html-react-parser';
import { NavLink } from 'react-router-dom';

const icon = (type) => {
  if (type === 'friend') {
    return (<span className="ion-person-add noti-list-icon" />)
  }
}

const Noti = (props) => {
  return(
    <NavLink to = {props.noti.url} className={`noti-wrapper ${(props.noti.flag === 0) ? 'noti-checked' : ''}`}>
      <div className="noti-avatar-wrapper">
        <img className="avatar-image" src={(props.noti.image) !== null ? props.noti.image : "http://genknews.genkcdn.vn/zoom/220_160/2017/thumbnail-4x3-34722014736-2d241425f9-k-1495531031736-crop-1495531041612.jpg"}/>
      </div>
      <div className="noti-contents">
        <p>{Parser(props.noti.contents)}</p>
        <p>{icon(props.noti.type)}<Moment className="noti-list-date" fromNow locale="ko">{props.noti.created_at}</Moment></p>
      </div>
    </NavLink>
  )
}

export default Noti;
