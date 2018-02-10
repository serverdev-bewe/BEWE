require('./ChatApp.css');

import React from 'react';
import io from 'socket.io-client';
import {Button } from 'reactstrap';

import Messages from './Messages';
import ChatInput from './ChatInput';
import RoomReadyBar from './RoomReadyBar';
import PropTypes from 'prop-types';

class ChatApp extends React.Component {
  static contextTypes={
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context);
    this.state = { 
        messages: [],
        socket: {},
        userList: [],
        query : this.props.query,
        readyUsers : [],
        readyCnt : 0,
        roomName: this.props.roomName,
        paramsGameNumber: this.props.paramsGameNumber,
        roomSeq : this.props.roomSeq
    };
    this.sendHandler = this.sendHandler.bind(this);
    this.readyHandler = this.readyHandler.bind(this);
    this.exitHandler = this.exitHandler.bind(this);
    this.onReadyBadge = this.onReadyBadge.bind(this);
    // Connect to the server
    this.socket = io(`http://localhost:4000`, {
      query: `username=${props.username}&gameSeq=${props.paramsGameNumber}&roomSeq=${props.roomSeq}` 
    }).connect();
    
    this.socket.emit('joinRoom');

    this.socket.on('server:message', data => {
      if(data.socketId == this.socket.id) return;
      this.addMessage(data.messageData);
    });

    this.socket.on('server:joinRoom', data =>{
      this.addUsers(data);
      this.onReadyBadge(data);
      this.addMessage(data.messageData);
    });
    this.socket.on('server:disconnect', data =>{
      this.addUsers(data);
      this.onReadyBadge(data);
      this.addMessage(data.messageData);
    })

    // this.socket.on('addMember', data =>{
    //   this.addUsers(data);
    // });

    this.socket.on('chattReadyCnt', data=>{
      this.setState({
        readyCnt : this.state.readyCnt + 1
      })
    })

    // this.socket.on('chattReadyOk', data=>{
    //   this.onReadyBadge(data);
    // });
  }

  onReadyBadge(data){
    this.setState({
      readyUsers : data.readyUsers
    });
  }

  componentWillUnmount(){
    this.socket.disconnect();
    this.setState({
      readyCnt : this.state.readyCnt - 1
    })
  }
    
  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };
    this.socket.emit('client:message', messageObject);
    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  readyHandler(){
    this.socket.emit('chattReady', {
      username: this.props.username
    });
  }
  exitHandler(){
    this.socket.disconnect();
    this.props.exitHandler();
  }

  addUsers(data){
    this.setState({ 
      userList : data.rooms
    });
  }
  addMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    if(this.state.readyCnt == 2){
      console.log('//////////////ready2 : ' + this.state.userList);
      {
        this.socket.emit('gameStart',{
          userList: this.state.userList,
          roomName: this.state.roomName
        })
        this.context.router.history.push('/startgame');
      }
    }
    return (
      <div className="containerm">
        <h3>{this.state.roomSeq}. {this.state.roomName} / {this.state.readyCnt}
        <Button outline color="danger" 
          onClick={this.readyHandler}
        >READY</Button>
        </h3>
        <RoomReadyBar userList={this.state.userList} 
          readyUsers={this.state.readyUsers}
        />
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
        <div>
        <Button color="info" className="exitButton" block
          onClick={this.exitHandler}
        >나가기</Button>
        </div>
      </div>
    );
  }
}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;