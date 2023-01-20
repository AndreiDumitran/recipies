import React from "react";
import Route from "../components/Route";
import Home from "./Home";
import Recipe from "./Recipe";

const Pages = () => {
  return (
    <div>
      <Route path="/">
        <Home />
      </Route>
    </div>
  );
};

export default Pages;
