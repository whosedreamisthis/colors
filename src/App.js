import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element=<h1>PALETTE LiST GOEs HERE</h1>></Route>
        <Route
          exact
          path="/palette/:id"
          element=<h1> individual element</h1>
        ></Route>
      </Routes>

      <div className="App">
        <Palette palette={generatePalette(seedColors[0])} />
      </div>
    </>
    // render={() => {
    //         return <h1>home</h1>;
    //       }}
  );
}

export default App;
