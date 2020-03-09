import React from "react";
import { Home } from "./components/Home";
import "./scss/app.scss";
import { Drumkit } from "./components/experiments/Drumkit";
import { CSSVariables } from "./components/experiments/CSSVariables";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { FlexGalery } from "./components/experiments/FlexGalery";
import { AnalogClock } from "./components/experiments/AnalogClock";
import { ClickNDrag } from "./components/experiments/ClickNDrag";
import { FollowAlongNav } from "./components/experiments/FollowAlongNav";
import { TextToSpeach } from "./components/experiments/TextToSpeach";
import { WebCamPlayground } from "./components/experiments/WebCamPlayground";

export const App = () => {
  return (
    <>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/drumkit" component={Drumkit} />
            <Route exact path="/cssvariables" component={CSSVariables} />
            <Route exact path="/flexgallery" component={FlexGalery} />
            <Route exact path="/analogclock" component={AnalogClock} />
            <Route exact path="/clickndrag" component={ClickNDrag} />
            <Route exact path="/folowalongnav" component={FollowAlongNav} />
            <Route exact path="/texttospeach" component={TextToSpeach} />
            <Route exact path="/webcamplay" component={WebCamPlayground} />
          </Switch>
        </Router>
      </div>
    </>
  );
};