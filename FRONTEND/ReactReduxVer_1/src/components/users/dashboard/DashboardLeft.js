import '../users.css';

import React, { Component } from 'react';
import ProfileAvatar from './ProfileAvatar';
import DashboardNav from './DashboardNav';

const DashboardLeft = () => {
  return(
    <div className="dashboard-left-navigation">
      <ProfileAvatar />
      <DashboardNav />
    </div>
  )
}

export default DashboardLeft;