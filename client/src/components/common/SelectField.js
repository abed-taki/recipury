import React from "react";
import classnames from "classnames";

const SelectField = ({ name, value, onChange, error, info, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div>
      <select
        className={classnames("create__input", {
          invalid: error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      <p className="create__info">{info}</p>

      <div className="error">
        {error ? <p className="error-class">{error}</p> : ""}
      </div>
    </div>
  );
};

export default SelectField;
