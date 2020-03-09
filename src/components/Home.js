import React from "react";
import { Hero } from "./Hero";
import { ExperimentsGrid } from "./ExperimentsGrid";

export const Home = () => {
  return (
    <>
    <header className="header-nav">
        <a href="https://github.com/urosradosavljevic">Back to Github</a>
      </header>
      <Hero />
      <ExperimentsGrid />

      <footer className="credits">
        Uroš Radosavljević
      </footer>
    </>
  );
};
