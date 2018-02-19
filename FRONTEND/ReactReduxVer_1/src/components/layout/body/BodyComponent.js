import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Container, Row, Col, Badge } from 'reactstrap';
import classnames from 'classnames';
import {HashLoader} from 'react-spinners';
import {default as Fade} from 'react-fade'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import JumbotronB from './JumbotronB';

const fadeDuration = 0.3;

class BodyComponent extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
          activeTab: '1',
          rows : [],
          pageNo : 0,
          hasMoreItems: true
        };
      }

      loadItems(page){
            axios.post(`http://localhost:3001/api/home/hash`, {
                'pageNo' : this.state.pageNo
            })
            .then(()=>{
                this.setState({
                    pageNo: this.state.pageNo + 1
                    ,hasMoreItems : false
                })
            })
            .then(()=>{
                console.log(this.state.pageNo);
            })
            .catch((err) => {
                console.log(err);
            });
      }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
        if(tab == 2){
            // if(this.state.rows.length == 0){
            axios.get(`http://localhost:3001/api/home/hash/${tab}`)
            .then((responseData) => {
                setTimeout(()=>{
                    this.setState({
                        rows:responseData.data
                    })
                },1500);
            })
            .catch((err) => {
                console.log(err);
            });
            setInterval(()=>{
                this.setState({
                    hasMoreItems:true
                })
            }, 3000)
        }
    }
                

    render() {
        const mapToComponents = (data) => {
            data = data.slice(0,this.state.pageNo * 8);
            return data.map((contact, i )=>{
                return (
                    <Col sm="3" key={i} style={{marginBottom:"3%"}}>
                        <Card body>
                        <CardTitle>{this.state.rows[i].title}</CardTitle>
                        <hr />
                        <CardText>{this.state.rows[i].contents}</CardText>
                        <font style={{color:"blue", fontSize:"18"}}>#베스트UGC</font>
                        <font style={{fontSize:"15"}}>{this.state.rows[i].created_at}</font>
                        </Card>
                    </Col>
                )
            })
        }
        return (
            <div>
                        
            <Container style={{marginBottom:"8%"}}>
                <JumbotronB/>
                <p/>
                <div>
                <hr />
                <Nav tabs>
                <NavItem>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                    >
                    인기컨텐츠
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                    >
                    #베스트UGC
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}
                    >
                    #이벤트
                    </NavLink>
                </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                <h1  style={{marginTop:"5%"}}>Today <Badge color="danger">Hot!</Badge></h1>
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
                </TabPane>
                <TabPane tabId="2">
                    {
                        this.state.rows.length !== 0
                        ?
                        <Fade duration={fadeDuration} >
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadItems.bind(this)}
                            hasMore={this.state.hasMoreItems}
                            loader={
                                <center
                                style={{marginTop:"10%"}}
                                >
                                    <HashLoader
                                    color={'#7F7F7F'} 
                                    loading={true} 
                                    />
                                </center>
                            }
                            useWindow={false}
                        >
                        <Row style={{marginTop:"5%"}}>
                        {mapToComponents(this.state.rows)}
                        </Row>
                        </InfiniteScroll>
                        </Fade>
                        :
                        <center
                        style={{marginTop:"10%"}}
                        >
                            <HashLoader
                            color={'#7F7F7F'} 
                            loading={true} 
                            />
                        </center>
                    }
                    <center
                        style={{marginTop:"10%"}}
                        >
                            <HashLoader
                            color={'#7F7F7F'} 
                            loading={true} 
                            />
                        </center>
                </TabPane>
                <TabPane tabId="3">
                <h1  style={{marginTop:"5%"}}>Today <Badge color="danger">Hot!</Badge></h1>
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
                </TabPane>
                </TabContent>
            </div>
                
            </Container>
            
          </div>
        );
    }
}

export default BodyComponent;