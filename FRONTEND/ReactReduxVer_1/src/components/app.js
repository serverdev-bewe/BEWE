import './app.css';
import React, { Component } from 'react';

import { BrowserRouter, Route, Switch, IndexRoute } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';

import Header from "../header/Header";
import Home from "../routes/Home";
import Login from '../login/Login';
import Footer from '../footer/Footer';
import SignUp from "../login/SignUp";
import MyGame from "../header/MyGame";
import Dashboard from "../components/users/dashboard/Dashboard";
import NotiList from "../components/users/noti/NotiList";
import GameRoomList from './GameRoomList';

const createStoreWithMiddleware = applyMiddleware()(createStore);


export default class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
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
            <Route path="/gameRoomList" component={GameRoomList} />
            <Route exact path="/users" component={Dashboard} />
            <Route path="/users/noties" component={NotiList} />
            <Route render={()=> <h1>Not found</h1>} />
          </Switch>
        <Footer/>
        </div>
        </BrowserRouter>
    </Provider>
    );
  }
}
