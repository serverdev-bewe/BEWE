import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { sendMessage } from '../../../../actions/users/MessageActions';
import Message from './Message';

class MessageForm extends Component{
  constructor(props){
    super(props);
  }
  
  onSubmit(values){
    console.log(values);
    this.props.sendMessage(values, this.props.conversationIdx);
  }

  render() {
    const { handleSubmit } = this.props;
    
    return(
      <form className="message-write" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="contents" component={contents => 
          <input type="text" {...contents.input} className="message-text" />
        }/>
        
        <button type="submit"><span className="ion-ios-paperplane-outline"></span></button>
      </form>
    )
  }
}

function validate(values){
  const errors = {};

  if(!values.contents){
    errors.contents = "Enter a contents";
  }

  return errors;
}

MessageForm = connect(null, { sendMessage })(MessageForm);

export default reduxForm({
  form: 'MessageNewForm'
})(MessageForm);