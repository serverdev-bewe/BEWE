import React, { Component } from 'react';
import DashboardLeft from './DashboardLeft';

class Dashboard extends Component {
  render() {
    return(
      <div className="container" style={{"backgroundColor": "white", "padding": "0"}}>
        <DashboardLeft />        
      </div>
    )
  }
}

export default Dashboard;