import '../users.css';

import React, { Component } from 'react';
import ProfileAvatar from './ProfileAvatar';
import DashboardNav from './DashboardNav';
import NotiBoard from './noti/NotiBoard';
import FriendBoard from './friends/FriendBoard';

const DashboardRight = () => {
  if((window.location.pathname) === '/users/noties') {
    return <NotiBoard />
  } else if((window.location.pathname) === '/users/friends') {
    return <FriendBoard />
  }

  return(
    <div>contents</div>
  )
}

export default DashboardRight;