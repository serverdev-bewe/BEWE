'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Notification from 'react-web-notification';

import { connect } from 'react-redux';

import reducers from '../../reducers';
import { setWebNotifyEnable, setWebNotifyUnable } from '../../actions/appActions';

window.React = React;

function mapStateToProps(state) {  
  return {
    grant: state.app.grant
  };
}

class NotificationMaker extends React.Component {
  handlePermissionGranted(){
    console.log('Permission Granted');
    this.props.setWebNotifyEnable();
  }
  handlePermissionDenied(){
    console.log('Permission Denied');
    this.props.setWebNotifyUnable();
  }
  handleNotSupported(){
    console.log('Web Notification not Supported');
    this.props.setWebNotifyUnable();
  }

  render() {

    return (
      <div>
        <Notification
          ignore={this.state.ignore && this.props.contents !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          timeout={5000}
          title={this.props.contents}
        />        
      </div>
    )
  }
};

export default connect(mapStateToProps, 
  { setWebNotifyEnable, setWebNotifyUnable })(NotificationMaker);