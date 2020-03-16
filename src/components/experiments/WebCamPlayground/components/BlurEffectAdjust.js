import React from "react";
import { ToggleCheckBtnSimple } from "../../../ToggleCheckBtnSimple";

export const BlurEffectAdjust = ({
  camFilter,
  charsetFlag,
  setCharsetFlag,
  fontHeight,
  setFontHeight
}) => {
  return (
    <div
      className={
        camFilter === "blureffect"
          ? "ascii-filter-controls display-flex"
          : "ascii-filter-controls"
      }
    >
      <h5>Blur Filter Controls</h5>

      <ToggleCheckBtnSimple
        title="ASCII"
        name="ascii-flag"
        value={charsetFlag}
        onChange={() => setCharsetFlag(!charsetFlag)}
      />

      <label htmlFor="ascii">
        Pixel Size:
        <input
          type="range"
          min={10}
          max={40}
          value={fontHeight}
          onChange={e => setFontHeight(parseInt(e.currentTarget.value))}
        />
      </label>
    </div>
  );
};
