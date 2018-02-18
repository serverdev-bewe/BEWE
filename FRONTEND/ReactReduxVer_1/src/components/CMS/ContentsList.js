import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContents, fetchContentsDetail } from "../../actions/CMS/CMSAction";


import ContentsDetail from './ContentsDetail';

class ContentsList extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.fetchContents();
  }


  renderContents() {
    return this.props.contents.map((data) => {
      return (
        <div key={data.idx}>
          <div>
            <ContentsDetail
              key={data.idx}
              flag={data.flag}
              title={data.title}
              genre={data.genre}
              description={data.description}
              image={data.image}
            />
            <button onClick={() => {this.props.history.push(`/contents/${data.idx}`)}}> 수정</button>
            <button onClick={() => {this.props.history.push(`/contents/${data.idx}`)}}> 삭제</button>

          </div>
        </div>

      )
    });
  };



  render(){
    return(
      <div>
        <div>
          내가 등록한 컨텐츠 목록
        </div>

        <div>
          <p>{this.renderContents()}</p>

        </div>


      </div>
    );
  }
}
function mapStateToProps(state){
  return { contents: state.CMS.all }
}


export default connect(mapStateToProps, { fetchContents, fetchContentsDetail })(ContentsList);