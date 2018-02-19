import React from 'react';
import { Card, CardImg, CardTitle, Badge, CardText, CardImgOverlay, Button } from 'reactstrap';
import Moment from 'react-moment';

function renderBadge(genre) {
  let color = '';

  if (genre === 'AOS') {
    color = "danger";
  } else if (genre === 'FPS') {
    color = "secondary";
  } else if (genre === 'RPG') {
    color = "primary";
  } else {
    color = "warning";
  }

  return (
    <Badge className="game-list-item-genre" color={color}>{genre}</Badge>
  )
}

const ContentsCard = (props) => {
  return (
    <Card className="store-game-wrapper">    
      <div className="store-game-image-wrapper">
        <CardImg className="avatar-image" src={(props.image) ? props.image : "http://genknews.genkcdn.vn/zoom/220_160/2017/thumbnail-4x3-34722014736-2d241425f9-k-1495531031736-crop-1495531041612.jpg"} alt="Card image cap" />
      </div>
      <div className="store-game-info-wrapper">
        <CardTitle>{props.title}</CardTitle> 
        <Moment className="store-game-created-at" format="YYYY/MM/DD">{props.created_at}</Moment>       
        <hr />    
        <CardText>
          {props.description}
        </CardText>    
      </div>  
      <Button color="primary" outline>자세히 보기</Button>    
      <CardImgOverlay>
          <div className="store-game-badge">{renderBadge(props.genre)}</div>
      </CardImgOverlay>    
    </Card>
  )
}

export default ContentsCard;