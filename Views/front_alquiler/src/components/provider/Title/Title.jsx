import react, { useState } from 'react';

const TitleCataComponente = ({ title, size }) => {
    return size == "h1" ? (
        <h1 className=''>{title}</h1>
    ) : size == "h6" ? (
        <h6 className=''>{title}</h6>
    ) : null
}

export default TitleCataComponente