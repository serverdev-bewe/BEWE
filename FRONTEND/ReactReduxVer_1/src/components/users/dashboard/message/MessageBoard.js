import React, { Component } from 'react';
import { default as Fade } from 'react-fade'

import ConversationList from './ConversationList';
import MessageList from './MessageList';

const fadeDuration = 0.5;

class MessageBoard extends Component {
  constructor(props){
    super(props);

    this.state = {
      index: 0,
      conversationIdx: 0,
      fadeOut: false
    }
  }

  componentWillUpdate(nextProps, { fadeOut }) {
    if (fadeOut) {
      setTimeout(() => {
        this.setState({
          fadeOut: false
        })
      }, fadeDuration);
    }
  }

  handleButtonChange(value) {
    this.setState({
      index: value,
      fadeOut: true
    });
  }
 
  render() {
    return (      
      <div className="dashboard-right-contents" style={{"padding":"30px 0"}}>
        <Fade
          out={this.state.fadeOut}
          duration={fadeDuration}
        >
          <div className="message-left-contents">
            <ConversationList conversationIdx={this.state.conversationIdx}/>
          </div>
          <div className="message-right-contents">
            {/* <MessageList /> */}
          </div>
        </Fade>
      </div>
    )
  }
}

export default MessageBoard;