import './app.css';
import React, { Component } from 'react';

import { BrowserRouter, Route, Switch, IndexRoute } from "react-router-dom";
import { connect } from 'react-redux';

import reducers from '../reducers';
import { dataFetch } from '../actions/appActions';

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
    new: state.app.new,
    grant: state.app.grant
  };
}

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.new !== nextProps.new) {
      clearTimeout(this.timeout);

      nextProps.new.map((noti) => {
        let contents = noti.contents.replace(/<\/?[^>]+(>|$)/g, "");
        let options = {
          icon: noti.image || 'http://genknews.genkcdn.vn/zoom/220_160/2017/thumbnail-4x3-34722014736-2d241425f9-k-1495531031736-crop-1495531041612.jpg'
        }
        var notification = new Notification(contents, options);
        notification.onclick = function(event) {
          event.preventDefault();
          window.location.replace(noti.url);
        }
        setTimeout(notification.close.bind(notification), 15000); 
      });
      
      this.startPoll();
    }
  }

  // 앱이 시작될 때 Fetch 해오기 시작
  componentWillMount() {
    this.props.dataFetch();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  // 폴링 시작
  startPoll() {
    this.timeout = setTimeout(() => this.props.dataFetch(), 15000);
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

export default connect(mapStateToProps, { dataFetch })(App);