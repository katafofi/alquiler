import React from "react";

export const SelectCataComponente = ({ required, label, name, value, options, onChange, disabled }) => {
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
        disabled={disabled}
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