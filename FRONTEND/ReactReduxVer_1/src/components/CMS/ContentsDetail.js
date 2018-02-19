import React from 'react';

function ContentsDetail({key, flag, title, genre, description, image}) {
  return (
    <div key={key}>
      <p>{flag}</p>
      <p>{title}</p>
      <p>{genre}</p>
      <p>{description}</p>
      <p>
        <ContentsImage image={image} alt={title} />
      </p>

    </div>
  );
}


function ContentsImage({image, alt}){
  return (
    <div>
      <img src={image} alt={alt}/>
    </div>
  );
}



export default ContentsDetail;