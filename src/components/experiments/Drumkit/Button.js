import React from "react";

export const Button = ({char,keyChar,sound}) => {
  return (
    <button type="button" data-char={char} className="key">{keyChar}<br/><span>{sound}</span></button>
  );
};
