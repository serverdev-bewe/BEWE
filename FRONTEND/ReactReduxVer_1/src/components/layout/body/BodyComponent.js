import React, { Component } from 'react';
import { Container, Row, Col, Badge } from 'reactstrap';
import JumbotronB from './JumbotronB';

class BodyComponent extends Component {
    render() {
        return (
            <Container style={{marginBottom:"8%"}}>
                
                <JumbotronB/>
                <p/>
                <h1>Today <Badge color="danger">Hot!</Badge></h1>
                <Row>
                    <Col xs="6" sm="4">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col xs="6" sm="4">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col sm="4">.Sample text Sample text Sample text Sample text Sample text </Col>
                </Row>
                <p/><br/>
                <h1>Content <Badge color="info">Sale</Badge></h1>
                <Row>
                    <Col xs="6" sm="4">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col xs="6" sm="4">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col sm="4">.Sample text Sample text Sample text Sample text Sample text </Col>
                </Row>
                <p/><hr/>
            </Container>
        );
    }
}

export default BodyComponent;