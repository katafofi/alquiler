import React from 'react';
import { useParams } from 'react-router-dom';

const ImagenCataComponente = (props) => {
  const { imageName } = useParams();

  const imageNames = imageName ? imageName : props.name
  const imageUrl = `http://localhost:3003/assets/${imageNames}.jpg`;

  const open = () => {
    window.open(`/images/${imageNames}`, '_blank');
  }

  const imageStyle = {
    width: props.name ? 100 : 'auto'
  };

  return (
    <div>
      <img style={imageStyle} src={imageUrl} alt={imageName} onClick={() => { open() }} />
    </div>
  );
}

export default ImagenCataComponente;