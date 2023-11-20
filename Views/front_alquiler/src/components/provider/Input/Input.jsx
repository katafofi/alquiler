import React from 'react';

const InputCataComponente = (props) => { //declaro el componente
  return (
    <div className='form-group'>
      <label htmlFor={props.id}>{props.name}:</label>
      <input  //los input son para ingreso de inaformacion 
        className='form-control'
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
      <br />
    </div>
  );
}

export default InputCataComponente;