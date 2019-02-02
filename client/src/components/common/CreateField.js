import React from "react";
import classnames from "classnames";

const CreateField = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
  info
}) => {
  return (
    <div>
      <div className="error">
        {error ? <p className="error-class">{error}</p> : ""}
      </div>
      <input
        type={type}
        className={classnames("create__input", {
          invalid: error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <p className="create__info">{info}</p>
    </div>
  );
};

export default CreateField;
