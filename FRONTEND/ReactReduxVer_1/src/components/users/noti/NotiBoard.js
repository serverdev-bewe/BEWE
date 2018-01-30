import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import NotiList from '../noti/NotiList';
import $ from 'jquery';

export default class Noti extends Component {
  constructor(props){
    super(props);

    this.state = {
      'type': 'all'
    }
  }

  componentWillMount(){

  }
 
  render() {
    return (
      <div style={{"height":"100%"}}>
        <div className="tab-slider-nav">
          <ul className="tab-slider-tabs">
            <li className="tab-slider-item">모든 알림</li>
            <li className="tab-slider-item">읽지 않은 알림</li>
          </ul>
        </div>        
        <NotiList />
      </div>
    )
  }
}
