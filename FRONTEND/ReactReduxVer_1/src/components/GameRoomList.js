import React, { Component } from 'react';

import ReactModal from 'react-modal';
import { Table, Button,
    InputGroup, Input
} from 'reactstrap';

import ListView from './chatt/ListView';
import ChatApp from './chatt/ChatApp';
import axios from 'axios';

import PropTypes from 'prop-types';

class GameRoomList extends Component {
    static contextTypes={
        router : PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            rows: [],
            keyword: '',
            roomSeq: 0,
            roomName :''
            , showModal: false,
            createRoomName : '',
            createRoomSize : '',
            paramsGameNumber:0
        }
        this.handleChange = this.handleChange.bind(this);
        this.roomHandler = this.roomHandler.bind(this);
        this.exitHandler = this.exitHandler.bind(this);

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCreateRoomModal = this.handleCreateRoomModal.bind(this);

        this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
        this.handleRoomSizeChange = this.handleRoomSizeChange.bind(this);
      }

      handleCreateRoomModal(e){
          if(this.state.createRoomName == ''){
            return 
          }
        axios.post(`http://localhost:4001/api/createroom`,{
                'name': this.state.createRoomName,
                'adminUser' : JSON.parse(localStorage.getItem("profile")).nickname,
                'cnt' : this.state.createRoomSize,
                'gameNumber' : this.state.paramsGameNumber
        })
        .then((responseDate)=>{
            console.log(responseDate);
            this.setState({rows : responseDate.data});
        }).catch((err)=>{
            console.log(err);
        }).then(
            this.handleCloseModal            
        )
      }

      handleRoomSizeChange(e){
        this.setState({
            createRoomSize : e.target.value
        })
      }
      handleRoomNameChange(e){
        this.setState({
            createRoomName : e.target.value
        })
      }
      
      handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
      }

    handleChange(e){
        this.setState({
            keyword : e.target.value
        })
    }
    componentWillMount(){
        this.setState({
            paramsGameNumber : this.props.match.params.gamenumber
        })
    }
    componentDidMount(){
        fetch(`http://localhost:4001/api/roomlist/${this.state.paramsGameNumber}`,{
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'token' : JSON.parse(localStorage.getItem("token"))
              }
        }).then((response)=> response.json())
        .then((responseDate)=>{
            this.setState({rows : responseDate});
        }).catch((err)=>{
            console.log(err);
        });
    }

    roomHandler(e){
        this.setState({
            roomSeq : e.roomSeq,
            roomName : e.roomName
        });
    }
    exitHandler(){
        this.setState({
            roomSeq : 0
        })
    }

    
    render() {
        // console.log(this.state.paramsRoomNumber);
        const mapToComponents = (data)=>{
            data = data.filter(
                (contact)=>{
                    return contact.name.indexOf(this.state.keyword) > -1;
                }
            );
            return data.map((contact, i)=>{
                let idx = i+1;
                return (
                    <ListView roomHandler={this.roomHandler} 
                        seq={this.state.rows[i].seq} 
                        roomAdmin={this.state.rows[i].adminUser} 
                        roomName={contact.name} 
                        cnt={contact.cnt} idx= {idx} key={i} />
                );
            });
        }

        return (
            <div>
                <hr/>
            <div style={{"display" : "inline-block", "width":"70%"}}>
                <h1>TITLE</h1>
                <div className="wi3">
                <InputGroup>
                <Input placeholder="방 이름을 적어주세요" 
                    value={this.state.keyword}
                    name="keyword"
                    onChange={this.handleChange}
                />
                </InputGroup>
                <Button color="info" 
                    onClick={this.handleOpenModal}
                >방 만들기</Button>
                <Button color="info"  onClick={()=> 
                    this.context.router.history.push(`/gamegamelist/${this.state.paramsGameNumber}`) 
                }
                >리스트 다시 불러오기</Button>
        <div >
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Inline Styles Modal Example"
           style={{
              overlay: {
                backgroundColor: '#6c757d',
                'marginTop':'76px',
                opacity: 0.97

              }
            }}
            onRequestClose={this.handleCloseModal}
            ariaHideApp={false}
        >
          <h1 style={{"marginTop":"5%"}}>방을 만들어 보세요</h1>
          <input type="text" required style={{width:"50%"}} name="name"
            onChange={this.handleRoomNameChange} value={this.state.createRoomName}
            placeholder="제목을 입력해 주세요"  maxLength="20"/>
            <br/>
          <input type="text" required style={{width:"50%"}} name="size"
            onChange={this.handleRoomSizeChange} value={this.state.createRoomSize}
            placeholder="인원은 몇명으로 설정하실껀가요? (최대 9명)" maxLength="1" />
            <p/>
          <button onClick={this.handleCreateRoomModal}>만들기</button>{' '}
          <button onClick={this.handleCloseModal}>돌아가기</button>
        </ReactModal>
        </div>
                &nbsp;
                <Button color="secondary" >Rank 시작</Button>
                <p/>
                </div>
                <Table hover>
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Room Name</th>
                    <th>Admin Name</th>
                    <th>Size</th>
                </tr>
                </thead>
                <tbody>
                    {mapToComponents(this.state.rows)}
                </tbody>
            </Table>
            </div>
            <div style={{"display" : "inline-block", "width":"20%"}}>
                hi
            </div>
            <div>
                <h1>Room IDX = {this.state.roomSeq}</h1>
                {
                    this.state.roomSeq ? 
                    <ChatApp paramsGameNumber={this.state.paramsGameNumber} 
                        roomSeq={this.state.roomSeq} 
                        roomName={this.state.roomName}
                        username={(JSON.parse(localStorage.getItem("profile")).nickname)}
                        exitHandler={this.exitHandler}
                    /> : ''
                }
            </div>
            </div>
        );
    }
}

export default GameRoomList;