import React from 'react';

const ImagenCataComponente = ({ match }) => {
   const imageName = match.params.imageName;
   console.log(imageName)
   const imageUrl = `http://localhost:3000/assets/${imageName}.pdf`;
   console.log(imageUrl)

  /*  
  - Actualizar archivos....
  - Correos...
  - realizar correccion de cotizacion... */

  return (
    <div>
      <h2>Imagen: {imageName}</h2>
      <img src={imageUrl} alt={imageName} />
    </div>
  );
}

export default ImagenCataComponente;