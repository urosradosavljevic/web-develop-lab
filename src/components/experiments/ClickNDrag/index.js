import React, { useState, useRef } from "react";
import "./style.scss";
import { Header } from "../Header";

export const ClickNDrag = () => {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);
  const drag = useRef(null);

  const mouseDown = e => {
    setIsDown(true);
    setStartX(e.clientX);
    setScrollLeft(drag.current.scrollLeft);
  };

  const mouseMove = e => {
    if (!isDown) return;
    e.preventDefault();
    drag.current.scrollLeft = scrollLeft - (e.pageX - startX);
  };

  const createItems = () => {
    const items = [];
    for (let i = 0; i < 27; i++) {
      items.push(<div className={`item item${i}`}>{i}</div>);
    }
    return items;
  };

  return (
    <>
      <Header />
      <div
        onMouseLeave={() => setIsDown(false)}
        onMouseUp={() => setIsDown(false)}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        className="body-clickndrag"
      >
        <div ref={drag} className={isDown ? "items active" : "items"}>
          {createItems()}
        </div>
      </div>
    </>
  );
};
