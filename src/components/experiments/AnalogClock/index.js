import React, { useState, useEffect } from "react";
import "./style.scss";
import moment from "moment";
import "moment-timezone";
import { Header } from "../Header";
import { ModernClockShadow } from "./ModernClockShadow";
import { ModernClockSurface } from "./ModernClockSurface";
import { RetroClock } from "./RetroClock";

export const AnalogClock = () => {
  const [hours, setHours] = useState({});
  const [minutes, setMinutes] = useState({});
  const [seconds, setSeconds] = useState({});
  const [full, setFull] = useState({});

  const tick = () => {
    const now = new Date();
    const dateLocal = moment();
    const dateLA = moment.tz(now, "America/Los_Angeles");
    const dateTokio = moment.tz(now, "Asia/Tokyo");

    setHours({
      local: dateLocal.format("h"),
      tokio: dateTokio.format("h"),
      losAngeles: dateLA.format("h")
    });
    setMinutes({
      local: dateLocal.format("m"),
      tokio: dateLA.format("m"),
      losAngeles: dateTokio.format("m")
    });
    setSeconds({
      local: dateLocal.format("s"),
      tokio: dateLA.format("s"),
      losAngeles: dateTokio.format("s")
    });
    setFull({
      local: dateLocal.format("ddd, HH:mm:ss"),
      tokio: dateLA.format("ddd, HH:mm:ss"),
      losAngeles: dateTokio.format("ddd, HH:mm:ss")
    });
  };

  useEffect(() => {
    const intervalId = setInterval(tick, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <>
      <Header />
      <div className="body-clock">
        <div className="naslov">time matters</div>
        <main>
          <RetroClock
            title="Local"
            hours={hours.local}
            minutes={minutes.local}
            seconds={seconds.local}
            full={full.local}
          />
          <ModernClockSurface
            title="Tokyo"
            hours={hours.tokio}
            minutes={minutes.tokio}
            seconds={seconds.tokio}
          />
          <ModernClockShadow
            title="Los Angeles"
            hours={hours.losAngeles}
            minutes={minutes.losAngeles}
            seconds={seconds.losAngeles}
            full={full.local}
          />
        </main>
      </div>
    </>
  );
};
