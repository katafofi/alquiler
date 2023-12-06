import react, { useState } from 'react';

const ButtonCataComponente = (props) => { //declaro segun el component
    return (
        <button type={props.type} disabled={props.disabled} onClick={props.onClick}>{ props.title }</button>
    );
}

export default ButtonCataComponente 