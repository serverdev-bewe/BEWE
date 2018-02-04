import './app.css';
import React, { Component } from 'react';

import { BrowserRouter, Route, Switch, IndexRoute } from "react-router-dom";
import { connect } from 'react-redux';

import reducers from '../reducers';
import { dataFetch, getNewMessage, setSocketConnected, setWebNotifyEnable, setWebNotifyUnable } from '../actions/AppActions';
import Header from "./layout/header/Header";
import Home from "../routes/Home";
import Login from './users/login/Login';
import SignUp from "./users/login/SignUp";
import Footer from './layout/footer/Footer';
import MyGame from "./layout/header/MyGame";
import Dashboard from "./users/dashboard/Dashboard";
import GameRoomList from './GameRoomList';
import StartGame from './StartGame';
import ContentsList from './CMS/ContentsList';

function mapStateToProps(state) {  
  return {
    newNoti: state.app.newNoti,
    newMessage: state.app.newMessage,
    grant: state.app.grant,
    socket: state.app.socket
  };
}

class App extends Component {  
  componentWillReceiveProps(nextProps) {
    if (this.props.newNoti !== nextProps.newNoti) {
      clearTimeout(this.timeout);
      
      if(nextProps.newNoti) {
        nextProps.newNoti.map((noti) => {
          let contents = noti.contents.replace(/<\/?[^>]+(>|$)/g, "");
          let options = {
            icon: noti.image || 'http://genknews.genkcdn.vn/zoom/220_160/2017/thumbnail-4x3-34722014736-2d241425f9-k-1495531031736-crop-1495531041612.jpg'
          }
          if(this.props.grant){
            const notification = new Notification(contents, options);
            notification.onclick = function(event) {
              event.preventDefault();
              window.location.replace(noti.url);
            }
          setTimeout(notification.close.bind(notification), 15000); 
          }
        });
      }
      
      this.startPoll();
    }
  }

  // 앱이 시작될 때 Fetch 해오기 시작
  componentWillMount() {
    this.props.dataFetch();
    this.props.setSocketConnected();
    
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
      this.props.setWebNotifyUnable();
    } else if (!this.props.grant) {
      Notification.requestPermission((permission) => {
        if (permission === "granted") {
          this.props.setWebNotifyEnable();
        } else {
          this.props.setWebNotifyUnable();
        }
      });
    }        
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentDidUpdate(){
    this.props.socket.on('new-message', (data) => {
      this.props.getNewMessage(data);
    });
  }

  // 폴링 시작
  startPoll() {
    this.timeout = setTimeout(() => this.props.dataFetch(), 1000);
  }

  render() {
    console.log('[App.js] render : ', this.props.newMessage);
    return (
      <BrowserRouter >
        <div>
          <Header  />        
          <div className="up">
            </div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/mygame" component={MyGame} />
              <Route path="/gamegamelist/:gamenumber" component={GameRoomList} />
              <Route path="/startgame" component={StartGame} />
              <Route path="/contents" component={ContentsList}/>
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

export default connect(mapStateToProps, 
  { dataFetch, getNewMessage, setSocketConnected, setWebNotifyEnable, setWebNotifyUnable })(App);