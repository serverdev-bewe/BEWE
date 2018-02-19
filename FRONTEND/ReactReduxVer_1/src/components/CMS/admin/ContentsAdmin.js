import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allowContents, fetchRequestAllowList } from '../../../actions/CMS/CMSAction';
import ContentsDetail from '../ContentsDetail';

class ContentsAdmin extends Component {
  constructor(props){
    super(props);
    this.state={}
  }


  componentWillMount(){
    this.props.fetchRequestAllowList();
  }
  renderLists(){
    return this.props.contents.map((data) => {
      return (
        <div >
          <ContentsDetail
            key={data.key}
            title={data.title}
            description={data.description}
            image={data.image}
          />
          <button onClick={() => {this.props.allowContents(data.idx)}}>승인하기</button>
        </div>

      )
    })
  }

  render(){
    return (
      <div>
        CMS Admin
        {this.renderLists()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return { contents: state.CMS.all }
}
export default connect(mapStateToProps, {allowContents, fetchRequestAllowList})(ContentsAdmin);