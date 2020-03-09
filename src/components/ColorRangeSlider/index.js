import React from "react";
import PropTypes from "prop-types";

export const ColorRangeSlider = ({ title, name, onChange, value }) => {
  return (
    <label htmlFor={name}>
      {title}
      <input
        type="range"
        min={0}
        max={255}
        value={value}
        onChange={onChange}
        name={name}
      />
    </label>
  );
};

ColorRangeSlider.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  content: PropTypes.string,
  value: PropTypes.number
};
