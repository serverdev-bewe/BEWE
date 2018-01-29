import React, {Component} from 'react';

class ListView extends Component{
    constructor(props) {
        super(props)
        this.state = {
            roomSeq : this.props.seq
        }
        this.roomHandler = this.roomHandler.bind(this);
    }
    roomHandler(e){
        e.preventDefault();
        this.props.roomHandler(this.state.roomSeq);
    }
    render(){

        return(
            <tr>
                <th>1</th>
                <td>
                    <a href="#" onClick={this.roomHandler}>
                    {this.props.roomName}
                    </a>
                </td>
                <td>{this.props.roomAdmin}</td>
                <td>{this.props.cnt}</td>
            </tr>
        );
    }
}
export default ListView;