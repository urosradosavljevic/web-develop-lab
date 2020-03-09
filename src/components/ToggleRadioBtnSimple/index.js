import React from "react";
import PropTypes from "prop-types"

export const ToggleRadioBtnSimple = ({title,id,name,onChange,checked}) => {
  return (
    <label htmlFor={id || name} className="toggle">
      <input
      onChange={onChange}
      checked={checked}
        name={name}
        type="radio"
        id={id || name}
        className="toggle__input"
      />
      <span className="toggle__button"></span>
      <span className="text">{title}</span>
    </label>
  );
};

ToggleRadioBtnSimple.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool
};
