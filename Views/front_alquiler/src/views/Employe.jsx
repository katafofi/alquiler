import React from 'react';
import ButtonCataComponente from '../components/provider/Button/Button';
import TitleCataComponente from '../components/provider/Title/Title';

const Employe = () => {
    // Puedes agregar el estado y efectos aquí si es necesario

    return (
        <div style={{ backgroundColor: 'white' }}>
         
            <ButtonCataComponente type="button" disabled={true} title="Ejecutar" />
         
            <TitleCataComponente title="catalina " size="h6" />
        </div>
    );
}

export default Employe;