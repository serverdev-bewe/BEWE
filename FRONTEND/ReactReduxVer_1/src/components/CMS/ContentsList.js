import React, { Component } from 'react';
import { Link } from 'react-router';


class ContentsList extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div>
        <div>
          asdlkfasldjf hihi
          <Link to="/cms/new" className="btn">
            add to contents
          </Link>

        </div>
      </div>
    );
  }
}


export default ContentsList;