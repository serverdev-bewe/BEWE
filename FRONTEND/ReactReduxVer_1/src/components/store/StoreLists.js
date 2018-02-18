import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStoreLists, postGamePurchase } from '../../actions/store/StoreAction';
import ContentsDetail from '../CMS/ContentsDetail';

class StoreLists extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  componentWillMount(){
    this.props.fetchStoreLists();
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
          <button onClick={() => {this.props.postGamePurchase(data.idx)}}>구매하기</button>
        </div>

      )
    })
  }

  render(){
    return(
      <div>
        <div>
          승인된 게임 목록
        </div>
        <div>
          {this.renderLists()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { contents: state.store.all }
}

export default connect(mapStateToProps, {fetchStoreLists, postGamePurchase})(StoreLists);


// export default StoreLists;