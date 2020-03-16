import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import { Header } from "../Header";
import { SimpleDialog } from "../../SimpleDialog";
import { WebCamStream } from "./components/WebCamStream";

import { getAverageRGB } from "./helpers";
import { CHARSET, GREEN_INITIAL } from "./consts";

import snapSoundSrc from "./media/snap.mp3";
import weatherImgSrc from "./media/weather_report.JPG";
import { BlurEffectAdjust } from "./components/BlurEffectAdjust";
import { GreenScreenAdjust } from "./components/GreenScreenAdjust";
import { EffectControls } from "./components/EffectControls";

export const WebCamPlayground = () => {
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  const cancelAnimationFrame =
    window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  let animationRequest;

  const [charsetFlag, setCharsetFlag] = useState(false);
  const [fontHeight, setFontHeight] = useState(20);
  const [camFilter, setCamFilter] = useState("blureffect");
  const [greenScreenRange, setGreenScreenRange] = useState(GREEN_INITIAL);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    content: "",
    btnText: ""
  });

  let video = useRef();
  let outputCanvas = useRef();
  let outputCtx = useRef();
  let hiddenCanvas = useRef();
  let hiddenCtx = useRef();
  let backgroundCanvas = useRef();
  let backgroundCtx = useRef();
  let snapSound = useRef();
  let photoStrip = useRef();
  let weatherReportImg = useRef();

  // setup canvases
  useEffect(() => {
    hiddenCtx.current = hiddenCanvas.current.getContext("2d");
    outputCtx.current = outputCanvas.current.getContext("2d");
    backgroundCtx.current = backgroundCanvas.current.getContext("2d");
    handleDialogOpen(
      "Instructions",
      "Use space button to take picture, to download desired picture click on it.",
      "Got it!"
    );
  }, []);

  // attaching, detaching handlers
  useEffect(() => {
    document.addEventListener("keydown", takePhoto);
    return () => {
      cancelAnimationFrame(animationRequest);
      document.removeEventListener("keydown", takePhoto);
    };
  }, []);

  // handle filter change
  useEffect(() => {
    changeEffect();
    if (camFilter === "greenscreen") {
      handleDialogOpen(
        "Instructions",
        "Find color spectrum (of colors you don't want to be shown) by changing red, green and blue colors limits",
        "Got it!"
      );
    } else if (camFilter === "blureffect") {
      handleDialogOpen(
        "Instructions",
        "Change pixel size or font size (ASCII mode) by dragging pixel size slider",
        "Got it!"
      );
    }
  }, [camFilter]);

  // handle filter adjust
  useEffect(() => {
    changeEffect();
  }, [greenScreenRange, charsetFlag, fontHeight]);

  // handlers
  const handleErrorWebCamError = err => {
    handleDialogOpen(
      "Warning!",
      `You have to allow webcam to use this app, ${err}`,
      "Cancel"
    );
    console.error("You have to allow webcam to use this app");
  };

  //Dialog handlers
  const handleDialogOpen = (title, content, btnText) => {
    setDialogContent({
      title,
      content,
      btnText
    });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // effect change handler
  const changeEffect = e => {
    const { videoWidth: width, videoHeight: height } = video.current;
    [backgroundCanvas.current.width, backgroundCanvas.current.height] = [
      width,
      height
    ];

    if (camFilter === "greenscreen") {
      setCanvasBackground();
    } else if (camFilter === "blureffect") {
      setCanvasBackground();
    }
    paintToCanvas();
  };

  const takePhoto = e => {
    if (e.key === " ") {
      setCanvasBackground();
      //play sound
      snapSound.current.currentTime = 0;
      snapSound.current.play();
      //merge with background
      backgroundCtx.current.drawImage(outputCanvas.current, 0, 0);
      //extract data from canvas
      const data = backgroundCanvas.current.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.href = data;
      link.classList.add("photoshot");
      link.setAttribute("download", "senf");
      link.innerHTML = `<img src=${data} alt="another photo" >`;
      photoStrip.current.insertBefore(link, photoStrip.current.firstChild);
      //clear background canvas
      setCanvasBackground();
    }
  };

  // single frame modulator
  const paintToCanvas = () => {
    const { videoWidth: width, videoHeight: height } = video.current;

    if (width && height) {
      [outputCanvas.current.width, outputCanvas.current.height] = [
        width,
        height
      ];
      [hiddenCanvas.current.width, hiddenCanvas.current.height] = [
        width,
        height
      ];

      hiddenCtx.current.drawImage(video.current, 0, 0, width, height);

      switch (camFilter) {
        case "blureffect":
          blurEffect(width, height);
          break;
        case "greenscreen":
          greenScreen(width, height);
          break;
        case "redeffect":
          redEffect(width, height);
          break;
        case "rgbsplit":
          rgbSplit(width, height);
          outputCtx.current.globalAlpha = 0.1;
          break;
        default:
          blurEffect(width, height);
          setCamFilter("blureffect");
          setCanvasBackground();
          break;
      }
    }
    animationRequest = requestAnimationFrame(paintToCanvas);
  };

  // Filters
  // Red filter
  const redEffect = (width, height) => {
    let pixels = hiddenCtx.current.getImageData(0, 0, width, height);

    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
      pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
      pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
    }

    outputCtx.current.putImageData(pixels, 0, 0);
  };
  // RGB split filter
  const rgbSplit = (width, height) => {
    let pixels = hiddenCtx.current.getImageData(0, 0, width, height);

    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i - 150] = pixels.data[i] + 100; // red
      pixels.data[i + 500] = pixels.data[i + 1] - 50; // green
      pixels.data[i - 550] = pixels.data[i + 2] * 0.5; // blue
    }

    outputCtx.current.putImageData(pixels, 0, 0);
  };
  // Green Screen filter
  const greenScreen = (width, height) => {
    let pixels = hiddenCtx.current.getImageData(0, 0, width, height);

    for (let i = 0; i < pixels.data.length; i += 4) {
      let red = pixels.data[i];
      let green = pixels.data[i + 1];
      let blue = pixels.data[i + 2];

      if (
        red >= greenScreenRange.rmin &&
        green >= greenScreenRange.gmin &&
        blue >= greenScreenRange.bmin &&
        red <= greenScreenRange.rmax &&
        green <= greenScreenRange.gmax &&
        blue <= greenScreenRange.bmax
      ) {
        pixels.data[i + 3] = 0;
      }
    }

    outputCtx.current.putImageData(pixels, 0, 0);
  };
  // Blur effect filter
  const blurEffect = (width, height) => {
    outputCtx.current.textBaseline = "top";
    outputCtx.current.font = `${fontHeight}px Cosolas`;

    const text = outputCtx.current.measureText("X");
    const fontWidth = parseInt(text.width);

    for (let y = 0; y < height; y += fontHeight) {
      for (let x = 0; x < width; x += fontWidth) {
        const frameSection = hiddenCtx.current.getImageData(
          x,
          y,
          fontWidth,
          fontHeight
        );
        const { r, g, b } = getAverageRGB(frameSection);

        outputCtx.current.fillStyle = `rgb(${r},${g},${b})`;

        if (charsetFlag) {
          const randomCharacter =
            CHARSET[Math.floor(Math.random() * CHARSET.length)];
          outputCtx.current.fillText(randomCharacter, x, y);
        } else {
          outputCtx.current.fillRect(x, y, fontWidth, fontHeight);
        }
      }
    }
  };

  // Green screen filter adjust
  const greenAdjust = e => {
    const [name, value] = [e.currentTarget.name, e.currentTarget.value];

    setGreenScreenRange({
      ...greenScreenRange,
      [name]: parseInt(value)
    });
  };

  const setCanvasBackground = () => {
    const [width, height] = [
      video.current.videoWidth,
      video.current.videoHeight
    ];
    [backgroundCanvas.current.width, backgroundCanvas.current.height] = [
      width,
      height
    ];
    switch (camFilter) {
      case "greenscreen":
        // weather picture background
        backgroundCtx.current.drawImage(
          weatherReportImg.current,
          0,
          0,
          width,
          height
        );
        break;
      case "blureffect":
        // black background
        backgroundCtx.current.fillStyle = "#000";
        backgroundCtx.current.fillRect(0, 0, width, height);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header />
      <div className="body-webcamplay">
        <canvas ref={outputCanvas} className="photo"></canvas>
        <canvas ref={backgroundCanvas} className="background"></canvas>
        <canvas ref={hiddenCanvas} className="hidden"></canvas>

        <div className="sidebar">
          <div className="player-wrapper">
            <h6>Raw Preview</h6>
            <WebCamStream
              ref={video}
              className="player"
              handleError={handleErrorWebCamError}
            />
          </div>

          <div className="controls">
            <EffectControls
              camFilter={camFilter}
              setCamFilter={setCamFilter}
              changeEffect={changeEffect}
            />

            <BlurEffectAdjust
              camFilter={camFilter}
              charsetFlag={charsetFlag}
              setCharsetFlag={setCharsetFlag}
              fontHeight={fontHeight}
              setFontHeight={setFontHeight}
            />

            <GreenScreenAdjust
              camFilter={camFilter}
              greenAdjust={greenAdjust}
              greenScreenRange={greenScreenRange}
            />
          </div>
        </div>

        <div ref={photoStrip} className="strip"></div>

        <audio ref={snapSound} className="snap" src={snapSoundSrc} />
        <img
          src={weatherImgSrc}
          ref={weatherReportImg}
          className="weather-report"
          alt="Weather report background"
        />
        <SimpleDialog
          title={dialogContent.title}
          content={dialogContent.content}
          btnText={dialogContent.btnText}
          open={dialogOpen}
          onClose={handleDialogClose}
        />
      </div>
    </>
  );
};
