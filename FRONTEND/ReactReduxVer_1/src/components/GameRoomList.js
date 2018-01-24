import React, { Component } from 'react';
import { Table,
    InputGroup, Input 
} from 'reactstrap';

import ListView from '../chatt/ListView';
import ChatApp from '../chatt/ChatApp';

class GameRoomList extends Component {
    constructor(props) {
        super(props);
        this.state={
            rows: [],
            keyword: '',
            roomSeq: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.roomHandler = this.roomHandler.bind(this);
    }
    handleChange(e){
        this.setState({
            keyword : e.target.value
        })
    }
    componentWillMount(){
        fetch('http://localhost:3000/roomList',{
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
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
            roomSeq : e
        });
    }
    
    render() {

        const mapToComponents = (data)=>{
            // data.sort();
            data = data.filter(
                (contact)=>{
                    return contact.name.indexOf(this.state.keyword) > -1;
                }
            );
            return data.map((contact, i)=>{
                return (
                    <ListView roomHandler={this.roomHandler} seq={this.state.rows[i].seq} roomAdmin={this.state.rows[i].adminUser} roomName={contact.name} cnt={contact.cnt} key={i} />
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
                    this.state.roomSeq ? <ChatApp idx={this.state.roomSeq} 
                    username={(JSON.parse(localStorage.getItem("profile")).nickname)}/> : ''
                }
            </div>
            </div>
        );
    }
}

export default GameRoomList;