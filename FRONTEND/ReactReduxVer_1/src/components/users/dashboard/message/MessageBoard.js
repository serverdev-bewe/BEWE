import React, { Component } from 'react';
import { default as Fade } from 'react-fade'

import ConversationList from './ConversationList';
import MessageList from './MessageList';

const fadeDuration = 0.5;

export default class MessageBoard extends Component {
  constructor(props){
    super(props);

    this.state = {
      index: 0,
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
      <div className="dashboard-right-contents">
        <Fade
          out={this.state.fadeOut}
          duration={fadeDuration}
        >
          <div className="message=left-contents">
            <ConversationList />
          </div>
          <div className="message-right-contents">
            {/* <MessageList /> */}
          </div>
        </Fade>
      </div>
    )
  }
}