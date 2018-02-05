import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Fields } from 'redux-form';
import { createContent } from '../../../actions/CMS/CMSAction';

const renderFields = (fields) => {
  return (
    <div>
      <div>
        <input {...fields.title.input} type="text" placeholder="title"/>
        {
          fields.title.meta.touch && fields.title.meta.error
          && <span className="error">
            {fields.title.meta.error}
            </span>
        }
      </div>
      <div>
        <input {...fields.genre.input} type="text" placeholder="genre"/>
        {
          fields.genre.meta.touch && fields.genre.meta.error
          && <span className="error">
            {fields.genre.meta.error}
            </span>
        }
      </div>
      <div>
        <input {...fields.description.input} type="text" placeholder="desc"/>
        {
          fields.description.meta.touch && fields.description.meta.error
          && <span className="error">
            {fields.description.meta.error}
            </span>
        }
      </div>
      <div>
        <input {...fields.images} type="file" accept='image/*'/>
      </div>
    </div>
  )
};


class ContentsRegister extends Component{
  constructor(props){
    super(props);
    this.state = {};
  };

  onSubmit(inputData){
    console.log('inputData: ', inputData);
    this.props.createContent(inputData)
  }

  render(){
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
        <Fields names={['title', 'genre', 'description', 'image']} component={renderFields}/>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ContentsRegister = connect(null, { createContent })(ContentsRegister);

export default reduxForm({
  form: 'ContentsRegisterForm'
})(ContentsRegister);
