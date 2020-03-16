import React from "react";
import { ColorRangeSlider } from "../../../ColorRangeSlider";

export const GreenScreenAdjust = ({
    camFilter,
    greenAdjust,
    greenScreenRange
  }) => {
    return (
      <div
      className={
        camFilter === "greenscreen"
          ? "green-screen-controls display-flex"
          : "green-screen-controls"
      }
    >
      <h5>Green Screen Controls</h5>
  
      <ColorRangeSlider
        name="rmin"
        title="Red Min:"
        value={greenScreenRange.rmin}
        onChange={greenAdjust}
      />
  
      <ColorRangeSlider
        name="rmax"
        title="Red Max:"
        value={greenScreenRange.rmax}
        onChange={greenAdjust}
      />
  
      <ColorRangeSlider
        name="gmin"
        title="Green Min:"
        value={greenScreenRange.gmin}
        onChange={greenAdjust}
      />
  
      <ColorRangeSlider
        name="gmax"
        title="Green Max:"
        value={greenScreenRange.gmax}
        onChange={greenAdjust}
      />
  
      <ColorRangeSlider
        name="bmin"
        title="Blue Min:"
        value={greenScreenRange.bmin}
        onChange={greenAdjust}
      />
  
      <ColorRangeSlider
        name="bmax"
        title="Blue Max:"
        value={greenScreenRange.bmax}
        onChange={greenAdjust}
      />
    </div>
    );
  };
  