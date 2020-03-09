import React from "react";

export const Panel = ({ name, position, icon, quote, img }) => {

  const handleClick = e => {
    e.currentTarget.classList.toggle("open");
  };

  return (
    <>
      <div
        onClick={handleClick}
        style={{ backgroundImage: "url(" + img + ")" }}
        className="panel"
      >
        <p>
          {name} - {position}
        </p>
        <p>{icon}</p>
        <p>{quote}</p>
      </div>
    </>
  );
};
