import React, { useEffect } from "react";
import {Header} from "../Header"
import "./style.scss";
import { Button } from "./Button";
import { Audio } from "./Audio";
import boom from "./sounds/boom.wav";
import clap from "./sounds/clap.wav";
import hihat from "./sounds/hihat.wav";
import kick from "./sounds/kick.wav";
import openhat from "./sounds/openhat.wav";
import ride from "./sounds/ride.wav";
import snare from "./sounds/snare.wav";
import tink from "./sounds/tink.wav";
import tom from "./sounds/tom.wav";

export const Drumkit = () => {

  const handleClick = e => {
    const key = e.target;
    const audio = document.querySelector(
      `audio[data-char="${key.dataset.char}"]`
    );
    if (audio !== null) {
      audio.currentTime = 0;
      const playPromise = audio.play();
      playPromise !== undefined &&
        playPromise.then(() => {}).catch(err => console.error(err));
      key.classList.add("playing");
    }
  };
  const keyPressed = e => {
    const key = document.querySelector(`button[data-char="${e.keyCode}"]`);
    const audio = document.querySelector(`audio[data-char="${e.keyCode}"]`);
    if (audio !== null) {
      audio.currentTime = 0;
      const playPromise = audio.play();
      playPromise !== undefined &&
        playPromise.then(() => {}).catch(err => console.error(err));
      key.classList.add("playing");
    }
  };

  const removeTransition = e => {
    e.target.classList.remove("playing");
  };

  useEffect(() => {
    window.addEventListener("keydown", keyPressed);
    document
      .querySelectorAll(".key")
      .forEach(button => button.addEventListener("click", handleClick));
    const keys = document.querySelectorAll(".key");
    keys.forEach(key =>
      key.addEventListener("transitionend", removeTransition)
    );
  });

  return (
    <>
    <Header/>
    <div className="body-drumkit">
      <div className="title">
        <span>Play</span>
        <span>with</span>
        <span>keyboard</span>
        <span className="btn">buttons</span>
      </div>
      <section className="keys">
        <Button char="65" keyChar="A" sound="boom" />
        <Button char="83" keyChar="S" sound="clap" />
        <Button char="68" keyChar="D" sound="hihat" />
        <Button char="70" keyChar="F" sound="kick" />
        <Button char="71" keyChar="G" sound="openhat" />
        <Button char="72" keyChar="H" sound="ride" />
        <Button char="74" keyChar="J" sound="snare" />
        <Button char="75" keyChar="K" sound="tink" />
        <Button char="76" keyChar="L" sound="tom" />
      </section>
      <section>
        <Audio char="65" src={boom} />
        <Audio char="83" src={clap} />
        <Audio char="68" src={hihat} />
        <Audio char="70" src={kick} />
        <Audio char="71" src={openhat} />
        <Audio char="72" src={ride} />
        <Audio char="74" src={snare} />
        <Audio char="75" src={tink} />
        <Audio char="76" src={tom} />
      </section>
    </div>
    </>
  );
};
