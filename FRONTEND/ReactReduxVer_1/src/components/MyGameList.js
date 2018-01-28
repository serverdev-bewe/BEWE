import './app.css';
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import { Jumbotron, Button,Badge,
    Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle,CardImgOverlay,
  Container, Row, Col
} from 'reactstrap';

class MyGameList extends Component {
    render() {
        return (
            <div className="center">
                <p/>
                <hr/>
                <Jumbotron>
                    <h1 className="display-3">Your GameList!</h1>
                    <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-2" />
                    <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
                    <p className="lead">
                    <Button color="primary">쇼핑하기</Button>
                    </p><br/>
                    <Container>
                <Row>
                    <Col  xs="6" sm="3">
                        <Card>
                        <CardImg width="100%" src="https://i.ytimg.com/vi/S4Hnc_iRuBk/maxresdefault.jpg" alt="Card image cap" />
                        <p/><CardTitle>Game Title</CardTitle>
                        <CardText>
                            This is a wider card with supporting text below as a natural lead-in 
                        </CardText>
                        <CardImgOverlay>
                            <div  className="leftCenter"><h5><Badge color="danger">HOT!</Badge></h5></div>
                        </CardImgOverlay>
                        <CardText>
                        <NavLink to="/gameRoomList" ><Button outline color="danger" >START!</Button></NavLink>
                        </CardText>
                        <p/>
                        </Card>
                    </Col >
                    <Col  xs="6" sm="3">
                        <Card>
                        <CardImg width="100%" alt="Card image cap" src="http://post.phinf.naver.net/MjAxNzAyMjdfMTM1/MDAxNDg4MTk0OTUxMzgx.DnQeRoSAEVGtGBJgLY2tmmjAtiujT_RYRjd5csfbTT0g.-GhV-au86bWwtaGBgrBOHoWeYs-RhIVCGEt8zDtQlMwg.PNG/IcoN3KjSbusLsg6-Lp1cKINXfHGc.jpg" />
                        <p/><CardTitle>Game Title</CardTitle>
                        <CardText>
                            This is a wider card with supporting text below as a natural lead-in 
                        </CardText>
                        <CardImgOverlay>
                            <div  className="leftCenter"><h5><Badge color="warning">↑40%</Badge></h5></div>
                        </CardImgOverlay>
                        <CardText>
                        <Button outline color="danger">START!</Button>
                        </CardText>
                        <p/>
                        </Card>
                    </Col >
                    <Col  xs="6" sm="3">
                        <Card>
                        <CardImg width="100%" alt="Card image cap" src="http://www.tennisthis.com/wp-content/uploads/2011/06/redux.jpg" />
                        <p/><CardTitle>Game Title</CardTitle>
                        <CardText>
                            What the fuck is wrong with you REDUX!
                        </CardText>
                        <CardImgOverlay>
                            {/* <div  className="leftCenter"><h5><Badge color="danger">HOT!</Badge></h5></div> */}
                        </CardImgOverlay>
                        <CardText>
                        <Button outline color="danger">START!</Button>
                        </CardText>
                        <p/>
                        </Card>
                    </Col >
                    <Col  xs="6" sm="3">
                        <Card>
                        <CardImg width="100%" alt="Card image cap" src="https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/nodejs-frameworks.png" />
                        <p/><CardTitle>Game Title</CardTitle>
                        <CardText>
                            This is a wider card with supporting text below as a natural lead-in
                        </CardText>
                        <CardImgOverlay>
                        </CardImgOverlay>
                        <CardText>
                        <Button outline color="danger">START!</Button>
                        </CardText>
                        <p/>
                        </Card>
                    </Col >
                </Row>
                <p/>
                </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default MyGameList;