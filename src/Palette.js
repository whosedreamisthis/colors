import React, { Component } from "react";
import ColorBox from "./ColorBox";

import "rc-slider/assets/index.css";
import "./Palette.css";
import Slider from "rc-slider";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
    this.changeLevel = this.changeLevel.bind(this);
  }
  changeLevel(level) {
    this.setState({ level });
  }
  render() {
    const colorBoxes = this.props.palette.colors[this.state.level].map((c) => (
      <ColorBox key={c.color} background={c.hex} name={c.name} />
    ));
    return (
      <div className="Palette">
        <div className="slider">
          <Slider
            defaultValue={this.state.level}
            min={100}
            max={900}
            step={100}
            onChangeComplete={this.changeLevel}
            track={{ backgroundColor: "red" }}
          />
        </div>
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default Palette;
