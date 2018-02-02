import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getMessages } from '../../../../actions/users/MessageActions';
import Message from './Message';

class MessageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      page: 1
    };
  }

  componentWillMount(){
    this.props.getMessages(this.props.conversationIdx);  
  }

  renderMessages(){
    console.log('render messages function'); 
    return this.props.messages
      // .slice(0, 15 * this.state.page - 1)
      .map((message) => {
        return (      
          <Message message={message} key={message.idx} />
        )
      });
  }

  render() {
    if(this.props.messages === undefined) {
      return <div>Loading...</div>
    }

    else {
      console.log('messge list render');
      return(
        <div>
          {this.renderMessages()}
        </div>
      )
      // if(this.props.friends.length > this.state.page * 15) {
      //   return(
      //     <div>
      //       {this.renderFriends()}
      //       <button className="noti-more-button" onClick={this.onClickButton}>더 보기</button>
      //     </div>
      //   )
      // } else {
      //   return(
      //     <div>
      //       {this.renderFriends()}
      //     </div>
      //   )
      // }
    }    
  }
}

function mapStateToProps(state){
  return { messages: state.messages.messages }
}

export default connect(mapStateToProps, { getMessages })(MessageList);