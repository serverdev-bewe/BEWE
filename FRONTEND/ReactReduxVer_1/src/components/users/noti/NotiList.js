import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { fetchNoties } from '../../../actions/users/notiActions';
import Noti from './Noti';

class NotiList extends Component {
  componentWillMount(){
    this.props.fetchNoties();
  }

  renderNoties(){
    return this.props.noties.reverse().map((noti) => {
      return (         
        <Noti noti={noti} key={noti.idx}/>
      )
    })
  }
  render() {
    if( this.props.noties === undefined ) {
      return <div>Loading...</div>
    }

    return(
      <div>
        {this.renderNoties()}
      </div>
    )
  }
}
function mapStateToProps(state){
  return { noties: state.noties.all }
}

export default connect(mapStateToProps, { fetchNoties })(NotiList);