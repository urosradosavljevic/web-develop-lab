import React from 'react'
import "./style.scss"
import PropTypes from "prop-types"

export const ModernClockShadow = ({hours,minutes,seconds,full}) => {
  
    const hoursAngle = hours * 30 + minutes / 2
    const minutesAngle = minutes * 6
    const secondsAngle = seconds * 6

    const checkSeconds = () => {
      if(secondsAngle === 0)  return "none"
      if(secondsAngle === 6) return "transform 0.3s cubic-bezier(.4,2.08,.55,.44)"      
    }

    return (
        <div className="clock clock-shadow">
            <div className="clock-face">
              <div className="digital">{full}</div>
              <div className="hand hand-hours" style={{transform:`rotate(${hoursAngle}deg)`}}>
                <span></span>
              </div>
              <div className="hand hand-minutes" style={{transform:`rotate(${minutesAngle}deg)`}}>
                <span></span>
              </div>
              <div className="hand hand-seconds" style={{transition: checkSeconds(), transform:`rotate(${secondsAngle}deg)`}}>
                <span></span>
              </div>
            </div>
          </div>
    )
}

ModernClockShadow.propTypes = {
  hours: PropTypes.string,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  full: PropTypes.string,
}