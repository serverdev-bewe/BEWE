import '../users.css';

import React, { Component } from 'react';
import ProfileAvatar from './ProfileAvatar';
import DashboardNav from './DashboardNav';
import NotiBoard from '../noti/NotiBoard';

const DashboardRight = () => {
  if((window.location.pathname) == '/users/noties') {
    return <NotiBoard />
  }

  return(
    <div>contents</div>
  )
}

export default DashboardRight;