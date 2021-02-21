import React from "react";

import "./Navigation.module.css";

const Navigation = ({ heading }) => {
  return (
    <nav>
      <h1>{heading}</h1>
    </nav>
  );
};

export default Navigation;
