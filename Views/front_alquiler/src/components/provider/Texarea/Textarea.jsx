import React from 'react';

const TextareaCataComponente = (props) => {
  return (
    <div className='form-group'>
      <label htmlFor={props.id}>{props.name}:</label>
      <textarea 
        className="form-control" 
        id={props.id} 
        rows="3" 
        cols={props.cols}
      ></textarea>
      <br />
    </div>
  );
}

export default TextareaCataComponente;