import React, { Component } from 'react';
import { connect} from 'react-redux';
import {fetchPurchasedLists} from '../../actions/store/StoreAction';


class StoreLists extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.fetchPurchasedLists();
  }

  renderLists(){
    return this.props.contents.map((data) => {
      return (
        <div key={data.idx}>
          <p>title: {data.title}</p>
          <p>description: {data.description}</p>
          <img src={data.image} alt=""/>
        </div>
      )
    })
  }


  render(){
    return(
      <div>
        {this.renderLists()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { contents: state.store.all }
}

export default connect(mapStateToProps, {fetchPurchasedLists})(StoreLists);