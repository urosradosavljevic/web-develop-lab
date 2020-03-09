import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import { Header } from "../Header";

export const TextToSpeach = () => {
  const [text, setText] = useState(
    "Petar Petru plete plot, sa tri pruta po tri puta, brzo pleti Petre plot."
  );
  const [playing,setPlaying] = useState(false)
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const speaker = useRef(new window.SpeechSynthesisUtterance(text));
  const [voices, setVoices] = useState([]);
  const [currentVoice, setCurrentVoice] = useState("");

  const getVoices = () => {
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      setVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = e => {
      voiceOptions = e.target.getVoices();
      setVoices(voiceOptions);
    };
  };

  const play = (startOver = true) => {
    setPlaying(true)
    window.speechSynthesis.cancel();
    if (startOver) window.speechSynthesis.speak(speaker.current);
  };

  const handleStop = () => {
    setPlaying(false)
  }

  // if current voice is changed, it sets it in speaker object
  useEffect(() => {
    if (speaker.current.voice !== currentVoice) {
      speaker.current.voice = voices.find(voice => voice.name === currentVoice);
      play();
    }
  }, [currentVoice,voices]);

  // playing listener
  useEffect(() => {
    speaker.current.addEventListener('end',handleStop)
    return () => {
      speaker.current.addEventListener('end',handleStop);
      window.speechSynthesis.cancel();
    }
  }, []);

  // changes speaker text on type
  useEffect(() => {
    if (speaker.current.text !== text) {
      speaker.current.text = text;
    }
  }, [text]);

  // changes speaker rate on rate change
  useEffect(() => {
    if (speaker.current.rate !== rate) {
      speaker.current.rate = rate;
      play();
    }
  }, [rate]);

  // changes speaker text on type
  useEffect(() => {
    if (speaker.current.pitch !== pitch) {
      speaker.current.pitch = pitch;
      play();
    }
  }, [pitch]);

  // gets voices from speaker object
  useEffect(() => {
    getVoices();
  }, []);

  return (
    <>
      <Header />
      <div className="body-texttospeach">
        <main className="voicemodulator">
          <header>
            <h4>Text to Speach</h4>
          </header>
          <select
            className="voice"
            value={currentVoice}
            onChange={e => {
              setCurrentVoice(e.currentTarget.value);
            }}
          >
            {voices.map((voice,key) => (
              <option key={key} value={voice.name}>{voice.name}</option>
            ))}
          </select>

          <div className="modulate-controls">
            <div className="rate">
              <label htmlFor="gmin">Rate</label>
              <input
                type="range"
                min={0}
                max={3}
                step={0.1}
                value={rate}
                onChange={e => setRate(e.currentTarget.value)}
              />
            </div>
            <div className="pitch">
              <label htmlFor="gmax">Pitch</label>
              <input
                type="range"
                min={0}
                max={2}
                step={0.1}
                value={pitch}
                onChange={e => setPitch(e.currentTarget.value)}
              />
            </div>
          </div>

          <textarea
            className="input-text"
            cols="30"
            value={text}
            onChange={e => setText(e.currentTarget.value)}
            rows="6"
          ></textarea>

          <div className="playing-controls">
            <button className={playing ? "play playing" : "play"} onClick={play}></button>
            <button className="stop" onClick={() => play(false)}></button>
          </div>
        </main>
      </div>
    </>
  );
};
