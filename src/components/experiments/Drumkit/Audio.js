import React from "react";

export const Audio = ({char, src }) => {
  return <audio data-char={char} className="audio" src={src} />;
};
