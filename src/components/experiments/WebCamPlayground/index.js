import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import { Header } from "../Header";
import { SimpleDialog } from "../../SimpleDialog";

import { getAverageRGB } from "./helpers";

import snapSoundSrc from "./media/snap.mp3";
import weatherImgSrc from "./media/weather_report.JPG";
import { ToggleRadioBtnSimple } from "../../ToggleRadioBtnSimple";
import { ToggleCheckBtnSimple } from "../../ToggleCheckBtnSimple";
import { ColorRangeSlider } from "../../ColorRangeSlider";

const greenInitial = {
  rmin: 100,
  rmax: 200,
  gmin: 50,
  gmax: 200,
  bmin: 50,
  bmax: 200
};

export const WebCamPlayground = () => {
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  const cancelAnimationFrame =
    window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  const [charsetFlag, setCharsetFlag] = useState(false);
  const [fontHeight, setFontHeight] = useState(20);
  const [camFilter, setCamFilter] = useState("blureffect");
  const [greenScreenRange, setGreenScreenRange] = useState(greenInitial);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({title:"",content:"",btnText:""});

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

  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&()/\\+<>";
  let animationRequest;
  // setup canvases
  useEffect(() => {
    hiddenCtx.current = hiddenCanvas.current.getContext("2d");
    outputCtx.current = outputCanvas.current.getContext("2d");
    backgroundCtx.current = backgroundCanvas.current.getContext("2d");
    setDialogContent({
      title: "Instructions",
      content: "Use space button to take picture, to download desired picture click on it.",
      btnText: "Got it!"
     });
     handleDialogOpen();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", takePhoto);
    return () => {
      cancelAnimationFrame(animationRequest)
      document.removeEventListener("keydown", takePhoto);
      console.log("Evo")
    };
  },[]);

  useEffect(() => {
    changeEffect();
    if(camFilter==="greenscreen"){
       setDialogContent({
      title: "Instructions",
      content: "Find color spectrum (of colors you don't want to be shown) by changing red, green and blue colors limits",
      btnText: "Got it!"
    });
    handleDialogOpen();
    }
   
  }, [camFilter, charsetFlag]);

  //Dialog handlers
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // get user video
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        video.current.srcObject = stream;
        video.current.play();
      })
      .catch(err => {
        setDialogContent({
          title: "Warning!",
          content: `You have to allow webcam to use this app, ${err}`,
          btnText: "Cancel"
        });
        handleDialogOpen();
        console.error("You have to allow webcam to use this app");
      });
  });

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
  // run on effect change
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

  // FILTERS
  const redEffect = (width, height) => {
    let pixels = hiddenCtx.current.getImageData(0, 0, width, height);

    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
      pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
      pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
    }

    outputCtx.current.putImageData(pixels, 0, 0);
  };

  const rgbSplit = (width, height) => {
    let pixels = hiddenCtx.current.getImageData(0, 0, width, height);

    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i - 150] = pixels.data[i] + 100; // red
      pixels.data[i + 500] = pixels.data[i + 1] - 50; // green
      pixels.data[i - 550] = pixels.data[i + 2] * 0.5; // blue
    }

    outputCtx.current.putImageData(pixels, 0, 0);
  };

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

  const greenAdjust = e => {
    const [name, value] = [e.currentTarget.name, e.currentTarget.value];

    setGreenScreenRange({
      ...greenScreenRange,
      [name]: parseInt(value)
    });
  };

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
            charset[Math.floor(Math.random() * charset.length)];
          outputCtx.current.fillText(randomCharacter, x, y);
        } else {
          outputCtx.current.fillRect(x, y, fontWidth, fontHeight);
        }
      }
    }
  };
  // End of filters

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
            <video ref={video} className="player"></video>
          </div>

          <div className="controls">
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
