import React, { Component } from 'react';
import { default as Fade } from 'react-fade'

import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';

class Dashboard extends Component {
  render() {
    return(
      <div className="container" 
           style={{"backgroundColor": "white", "padding": "0", 
                   "minHeight": "100%", "height": "auto"}}>
        <DashboardLeft />       
        
        <Fade className="dashboard-right-wrapper">
          <DashboardRight />
        </Fade> 
      </div>
    )
  }
}

export default Dashboard;