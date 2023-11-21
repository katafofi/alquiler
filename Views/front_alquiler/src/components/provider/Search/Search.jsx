import React from "react";

const SearchCataComponente = (props) => {
  //declaro el componente
  return (
    <div className="form-group">
      <input
      style={{width: 180, float: 'right', zIndex: 999999}}
        className="form-control"
        type={props.type}
        value={props.value}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <br />
    </div>
  );
};

export default SearchCataComponente;
