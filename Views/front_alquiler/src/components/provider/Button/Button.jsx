import react, { useState } from 'react';

const ButtonCataComponente = (props) => {
    return (
        <button type={props.type} disabled={props.disabled}>{ props.title }</button>
    );
}

export default ButtonCataComponente 