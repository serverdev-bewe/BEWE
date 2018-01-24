require('./ChatApp.css');

import React from 'react';
import io from 'socket.io-client';

import Messages from './Messages';
import ChatInput from './ChatInput';
import RoomReadyBar from './RoomReadyBar';

class ChatApp extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = { 
          messages: [],
          socket: {},
          userList: [],
          query : this.props.query
      };
      this.sendHandler = this.sendHandler.bind(this);
      
      // Connect to the server
      this.socket = io('http://localhost:4008', { query: `username=${props.username}` }).connect();
  
      this.socket.emit('joinRoom', {
        username : this.props.username, 
        idx : this.props.idx
      });
      // Listen for messages from the server
      this.socket.on('server:message', message => {
        console.log(message);
        this.addMessage(message);
      });
  
      this.socket.on('addMember', data =>{
        this.addUsers(data);
      });
    }

    
  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      idx : this.state.idx,
      message
    };

    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }
  addUsers(data){
    // this.setState({
    //   userList : data.rooms
    // });
    const userList = this.state.userList;
    userList.push(data);
    this.setState({ userList, idx : data.idx });
    console.log(this.state.idx);
  }
  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    return (
      <div className="containerm">
      <h3>{this.state.idx}. {this.props.username}</h3>
        <RoomReadyBar userList={this.state.userList}/>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;