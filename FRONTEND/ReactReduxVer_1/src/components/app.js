import './app.css';
import React, { Component } from 'react';
import Notification from 'react-web-notification';

import { BrowserRouter, Route, Switch, IndexRoute } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import reducers from '../reducers';
import * as DataActions from '../actions/appActions';

import Header from "./layout/header/Header";
import Home from "../routes/Home";
import Login from './users/login/Login';
import SignUp from "./users/login/SignUp";
import Footer from './layout/footer/Footer';
import MyGame from "./layout/header/MyGame";
import Dashboard from "./users/dashboard/Dashboard";
import NotiList from "./users/noti/NotiList";
import GameRoomList from './GameRoomList';
import GameRoomCreate from './GameRoomCreate';

function mapStateToProps(state) {  
  return {
    new: state.app.data,
    isFetching: state.app.isFetching,
    ignore: state.app.ignore
  };
}
 
function mapDispatchToProps(dispatch) {  
  return {
      dataActions: bindActionCreators(DataActions, dispatch)
  };
}

class App extends Component {
  handlePermissionGranted(){
    console.log('Permission Granted');
    //this.props.ignore = false;
  }
  handlePermissionDenied(){
    console.log('Permission Denied');
    //this.props.ignore = true;
  }
  handleNotSupported(){
    console.log('Web Notification not Supported');
    //this.props.ignore = true;
  }

  handleNotificationOnError(e, tag){
    console.log(e, 'Notification error tag:' + tag);
  }

  // 받아온 props이 이전 props과 다르다면 timeout 새로 시간 세팅
  componentWillReceiveProps(nextProps) {
    if (this.props.new !== nextProps.new) {
      clearTimeout(this.timeout);

      if (!nextProps.isFetching) {
          this.startPoll();
      }
    }
  }

  // 앱이 시작될 때 Fetch 해오기 시작
  componentWillMount() {
    this.props.dataActions.dataFetch();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  // 폴링 시작
  startPoll() {
    this.timeout = setTimeout(() => this.props.dataActions.dataFetch(), 15000);
  }

  render() {
    return (
      <BrowserRouter >
        <div style={{ "width" : "100%", "height" : "100%"}}>
          <Header  />        
          <div className="up">
            </div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/mygame" component={MyGame} />
              <Route path="/gameRoomList" component={GameRoomList} />
              <Route path="/users" component={Dashboard} >
              </Route>
              <Route render={()=> <h1>Not found</h1>} />
            </Switch>
          <Footer/>
        </div>
        </BrowserRouter>
    );
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);