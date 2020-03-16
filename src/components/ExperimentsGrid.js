import React from "react";
import drumBoxPreview from "../img/drumbox-preview.jpg";
import flexGalleryPreview from "../img/flex-galery-preview.jpg";
import cssVariablePreview from "../img/css-variables-preview.jpg";
import followAlongPreview from "../img/followalongnav-preview.jpg";
import textToSpeachPreview from "../img/texttospeach-preview.jpg";
import webCamPlayPreview from "../img/webcamplay-preview.jpg";
import analogClock from "../img/clock-preview.jpg";
import clickndrag from "../img/clickndrag-preview.jpg";
import { useHistory } from "react-router-dom";


export const ExperimentsGrid = () => {
  const history = useHistory();

  return (
    <>
      <div className="experiments">
        <h2>Experiments</h2>
        <div className="experiments-grid">
          <div className="experiments-item" role="button" onClick={() => history.push("/drumkit")}>
            <img src={drumBoxPreview} alt="Drumbox experiment preview" />
            <h3>Drum Kit</h3>
          </div>
          <div  className="experiments-item" role="button" onClick={() => history.push("/cssvariables")}>
            <img src={cssVariablePreview} alt="Css Variables experiment preview" />
            <h3>Css Variables</h3>
          </div>
          <div  className="experiments-item" role="button" onClick={() => history.push("/flexgallery")}>
            <img src={flexGalleryPreview} alt="Flex Galery experiment preview" />
            <h3>Flex Gallery</h3>
          </div>
          <div  className="experiments-item" role="button" onClick={() => history.push("/clickndrag")}>
            <img src={clickndrag} alt="Click and Drag experiment preview" />
            <h3>Click n Drag</h3>
          </div>
          <div  className="experiments-item" role="button" onClick={() => history.push("/webcamplay")}>
            <img src={webCamPlayPreview} alt="Web Cam Playground experiment preview" />
            <h3>Web Cam Playground</h3>
          </div>
          <div  className="experiments-item" role="button" onClick={() => history.push("/analogclock")}>
            <img src={analogClock} alt="Analog Clock experiment preview" />
            <h3>Analog Clock</h3>
          </div>
          <div  className="experiments-item" role="button" onClick={() => history.push("/folowalongnav")}>
            <img src={followAlongPreview} alt="Follow along navigation experiment preview" />
            <h3>Follow along navigation</h3>
          </div>
          <div  className="experiments-item" role="button" onClick={() => history.push("/texttospeach")}>
            <img src={textToSpeachPreview} alt="Text to Modulated Spech experiment preview" />
            <h3>Text to Modulated Spech</h3>
          </div>
          
        </div>
      </div>
    </>
  );
};
