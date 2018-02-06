import '/../style/users.css';

import React, { Component } from 'react';
import NotiBoard from './noti/NotiBoard';
import FriendBoard from './friends/FriendBoard';
import ProfileBoard from './profile/ProfileBoard';
import MessageBoard from './message/MessageBoard';

const DashboardRight = (props) => {
  if((window.location.pathname) === '/users/profile' ||
     (window.location.pathname) === '/users') {
    return <ProfileBoard />
  } else if((window.location.pathname) === '/users/friends') {
    return <FriendBoard />
  } else if((window.location.pathname) === '/users/noties') {
    return <NotiBoard />
  } else if((window.location.pathname) === '/users/messages') {
    return <MessageBoard height={props.height}/>
  }

  return(
    <div>contents</div>
  )
}

export default DashboardRight;