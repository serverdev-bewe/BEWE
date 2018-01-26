import React, { Component } from 'react';
import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';

class Dashboard extends Component {
  render() {
    return(
      <div className="container" 
           style={{"backgroundColor": "white", "padding": "0", 
                   "minHeight": "100%", "height": "auto"}}>
        <DashboardLeft />       
        
        <div className="dashboard-right-wrapper">
          <DashboardRight />
        </div> 
      </div>
    )
  }
}

export default Dashboard;