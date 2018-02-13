require('./ChatApp.css');

import React from 'react';
import io from 'socket.io-client';
import {Button } from 'reactstrap';

import Messages from './Messages';
import ChatInput from './ChatInput';
import RoomReadyBar from './RoomReadyBar';
import PropTypes from 'prop-types';
import axios from 'axios';

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
    this.socket = io(`http://192.168.0.60:70`, {
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
    
    this.socket.on('server:chattReady', data=>{
      this.onReadyBadge(data);
      if(data.readyUsers.length == data.roomSize){
        //GAMEAPI JSON
        axios.post(`http://localhost:4001/api/deleteroom`,{
          'name': this.state.createRoomName,
          'adminUser' : JSON.parse(localStorage.getItem("profile")).nickname,
          'cnt' : this.state.createRoomSize,
          'gameNumber' : this.state.paramsGameNumber,
          'roomSeq': this.props.roomSeq
        });
        //
        //JSON 태웅이한테 JSON전달
        //게임exe실행코드
        this.context.router.history.push('/startgame');
      }
    });

    this.socket.on('server:disconnect', data =>{
      this.addUsers(data);
      this.onReadyBadge(data);
      this.addMessage(data.messageData);
    })
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
      username: this.props.username,
      roomSize: this.props.roomSize[this.props.roomSeq-1].cnt
    });
  }
  exitHandler(){
    this.props.exitHandler();
    //방장이라면
    
    // console.log(this.props.roomSize[this.props.roomSeq-1].adminUser);
    // if(this.props.roomSize[this.props.roomSeq-1].adminUser)
    if(this.props.username === this.props.roomSize[this.props.roomSeq-1].adminUser){
      axios.post(`http://localhost:4001/api/deleteroom`,{
                'name': this.state.createRoomName,
                'adminUser' : JSON.parse(localStorage.getItem("profile")).nickname,
                'cnt' : this.state.createRoomSize,
                'gameNumber' : this.state.paramsGameNumber,
                'roomSeq': this.props.roomSeq
        });
      const messageObject = {
            username: this.props.username,
            message : `방장이신 ${this.props.username}님이 접속을 종료하여 게임을 진행할 수 없습니다. 다른 방에 입장해 주세요.`
          };
      this.socket.emit('client:message', messageObject);
      this.addMessage(messageObject);
      this.socket.disconnect();
    }
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
    return (
      <div className="containerm">
        <div>
        <h3>{this.state.roomSeq}. {this.state.roomName}
        &nbsp;
        <div>
        <Button outline color="danger" 
          onClick={this.readyHandler}
        >READY</Button>
        </div>
        </h3>
        </div>
        
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