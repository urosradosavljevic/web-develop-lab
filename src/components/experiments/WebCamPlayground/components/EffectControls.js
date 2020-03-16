import React from "react";
import { ToggleRadioBtnSimple } from "../../../ToggleRadioBtnSimple";

export const EffectControls = ({
    camFilter,
    setCamFilter,
    changeEffect
}) => {
  return (
    <>
      <ToggleRadioBtnSimple
        title="Blur Effect"
        name="effect"
        id="blureffect"
        checked={camFilter === "blureffect"}
        onChange={e => {
          setCamFilter(e.target.id);
          changeEffect();
        }}
      />

      <ToggleRadioBtnSimple
        title="Red Effect"
        name="effect"
        id="redeffect"
        checked={camFilter === "redeffect"}
        onChange={e => {
          setCamFilter(e.target.id);
          changeEffect();
        }}
      />

      <ToggleRadioBtnSimple
        title="RGB Split"
        name="effect"
        id="rgbsplit"
        checked={camFilter === "rgbsplit"}
        onChange={e => {
          setCamFilter(e.target.id);
          changeEffect();
        }}
      />

      <ToggleRadioBtnSimple
        title="Green Screen"
        name="effect"
        id="greenscreen"
        checked={camFilter === "greenscreen"}
        onChange={e => {
          setCamFilter(e.target.id);
          changeEffect();
        }}
      />
    </>
  );
};
