import React, { Component } from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { Route, Routes, useParams } from "react-router-dom";

const App = () => {
  const parts = window.location.href.split("/");

  let lastSegment = parts.pop(); // handle potential trailing slash

  const findPalette = (id) => {
    if (lastSegment === "") {
      return seedColors[2];
    }
    const found = seedColors.find(function (palette) {
      return palette.id === id;
    });
    return found;
  };

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={<Palette palette={generatePalette(seedColors[2])} />}
        ></Route>
        <Route
          exact={true}
          path="/palette/:id"
          element={
            <Palette palette={generatePalette(findPalette(lastSegment))} />
          }
        ></Route>
      </Routes>
    </div>
    /* {<div className="App">
        <Palette palette={generatePalette(seedColors[0])} />
      </div> }*/

    // render={() => {
    //         return <h1>home</h1>;
    //       }}
  );
};

export default App;
