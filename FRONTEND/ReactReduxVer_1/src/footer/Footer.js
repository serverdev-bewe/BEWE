import './Footer.css';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';


class Footer extends Component {
    render() {
        return (
            <div className="footer">
            <Container>
                <p/>
                <h1>Footer </h1>
                <Row>
                    <Col xs="6" sm="6">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col xs="6" sm="3">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col sm="3">.Sample text Sample text Sample text Sample text Sample text </Col>
                </Row>
                <p/><br/>
                
            </Container>
            </div>
        );
    }
}


export default Footer;