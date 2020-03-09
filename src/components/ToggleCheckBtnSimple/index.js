import React from "react";
import PropTypes from "prop-types"

export const ToggleCheckBtnSimple = ({ title, id, name, onChange, value }) => {
  return (
    <label htmlFor={id || name} className="toggle">
      <input
        onChange={onChange}
        value={value}
        name={name}
        type="checkbox"
        id={id || name}
        className="toggle__input"
      />
      <span className="toggle__button"></span>
      <span className="text">{title}</span>
    </label>
  );
};

ToggleCheckBtnSimple.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.bool
};
