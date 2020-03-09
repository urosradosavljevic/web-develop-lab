import { Link } from "react-router-dom";
import React from "react";

export const Header = () => {
  return (
    <header className="header-nav">
      <Link to="/">
        Back Home
      </Link>
    </header>
  );
};
