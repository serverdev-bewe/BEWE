import './Header.css';
import '../../style/style.css';

import React from 'react';
import {NavLink} from 'react-router-dom';
import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
  ButtonGroup} from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      modal: false
    };
    this.navToggle = this.navToggle.bind(this);
    
  }

  navToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  login(){

  }

  render() {
    return (
      <div className="navv">
      <div className="navv2">
        <Navbar light expand="md">
        <NavLink to="/" className="item" activeClassName="active">
         
          <img width="13%" src="http://download.seaicons.com/download/i6357/cute-little-factory/breakfast/cute-little-factory-breakfast-coffee-cup.ico"/>
          <span className="navfont">BeWe</span>
          </NavLink>
          
          <ButtonGroup>
          <Button color="secondary">전체 게임</Button>{' '}
          <NavLink to="/mygame" className="item" activeClassName="active">
            <Button color="secondary">내 게임</Button>{' '}
          </NavLink>
          <Button color="secondary">커뮤니티</Button>{' '}

          <Button color="secondary">랭킹</Button>{' '}
          </ButtonGroup>
            {localStorage.getItem("token") ? 
              <NavLink to="/" className="item" activeClassName="active">
                <Button color="success" onClick={()=>
                  {localStorage.removeItem("token")
                  localStorage.removeItem("profile")
                  console.log('logout')}
                } >Logout</Button>
              </NavLink>
              : <NavLink to="/login" className="item" activeClassName="active">
                  <Button color="primary">Login</Button>
                </NavLink>
            }
          
          
          <NavbarToggler onClick={this.navToggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                1
                {/* <NavLink href="/components/">Components</NavLink> */}
              </NavItem>
              <NavItem>
                2
                {/* <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink> */}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      </div>
    );
  }
}

//         <ul className="header">
//            <NavLink exact to="/" className="item" activeClassName="active">홈</NavLink>
//             <NavLink to="/allgames" className="item" activeClassName="active">
//                 전체 게임</NavLink>
//             <NavLink to="/mygames" className="item" activeClassName="active">내 게임</NavLink>
//             <NavLink to="/community" className="item" activeClassName="active">커뮤니티</NavLink>
//             <NavLink to="/rank" className="item" activeClassName="active">랭킹</NavLink>
              
//             <NavLink to="/login" className="item" activeClassName="active">로그인</NavLink>
//         </ul>
//     );
//   }
// }