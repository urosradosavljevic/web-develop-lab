import React from "react";
import "./style.scss";
import PropTypes from "prop-types"

export const ModernClockSurface = ({ hours, minutes, seconds,title }) => {
  const hoursAngle = hours * 30 + minutes / 2;
  const minutesAngle = minutes * 6;
  const secondsAngle = seconds * 6;

  const checkSeconds = () => {
    if(secondsAngle === 0)  return "none"
    if(secondsAngle === 6) return "transform 0.3s cubic-bezier(.4,2.08,.55,.44)"      
  }
  
  return (
    <div className="clock-surface">
      <div data-title={title} className="clock-face-surface">
        <div className="marker marker1"></div>
        <div className="marker marker2"></div>
        <div className="marker marker3"></div>
        <div className="marker marker4"></div>
        <div className="marker marker5"></div>
        <div className="marker marker6"></div>
        <div
          className="hand hand-hours"
          style={{ transform: `rotate(${hoursAngle}deg)` }}
        >
          <span></span>
        </div>
        <div
          className="hand hand-minutes"
          style={{ transform: `rotate(${minutesAngle}deg)` }}
        >
          <span></span>
        </div>
        <div
          className="hand hand-seconds"
          style={{transition: checkSeconds(),  transform: `rotate(${secondsAngle}deg)` }}
        >
          <span></span>
        </div>
      </div>
    </div>
  );
};

ModernClockSurface.propTypes = {
  hours: PropTypes.string,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  full: PropTypes.string,
}