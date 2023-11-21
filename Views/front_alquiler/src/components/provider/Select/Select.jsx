import React from "react";

export const SelectCataComponente = ({ required, label, name, value, options, onChange }) => {
  return (
    <div className="form-group">
       <label htmlFor={name}>{name}:</label>
      <select
        className="form-control"
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
      >
        <option>{label}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <br />
    </div>
  );
};