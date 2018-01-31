import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from "../../../actions/CMS/CMSAction";


class ContentsRegister extends Component{
  constructor(props){
    super(props);
    this.state = {};
  };



  render(){
    const { fields: {title, genre, description } } = this.props;
    return(
      <form action="">
        <div>
          <h3>Create a New Game</h3>
          <label htmlFor="">Title</label>
          <input type="text" className="form-control" {...title}/>
        </div>

        <button type="submit" className="btn"> 등록 </button>
      </form>
    );
  }
}

function validate(values){
  const errors = {};
  if(!values.title){
    errors.title = 'Enter a title';
  }
  if(!values.genre){
    errors.genre = 'Enter a genre';
  }
  if (!values.description){
    errors.description = 'Enter a description';
  }
}

export default reduxForm({
  form: 'ContentsCreateForm',
  fields: ['title', 'genre', 'description', 'image'],
  validate
}, null, { createPost })(ContentsRegister);

