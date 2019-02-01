import React from "react";
import classnames from "classnames";

const InputField = ({ type, placeholder, name, value, onChange, error }) => {
  return (
    <div>
      <input
        type={type}
        className={classnames("login__input", {
          invalid: error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />

      <div className="error">
        {error ? <p className="error-class">{error}</p> : ""}
      </div>
    </div>
  );
};

export default InputField;
