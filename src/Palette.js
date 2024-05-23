import React, { Component } from "react";
import ColorBox from "./ColorBox";

import "rc-slider/assets/index.css";
import "./Palette.css";
import Slider from "rc-slider";
import NavBar from "./NavBar";
class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
    this.changeLevel = this.changeLevel.bind(this);

    this.changeFormat = this.changeFormat.bind(this);
  }
  changeLevel(level) {
    this.setState({ level });
  }
  changeFormat(e) {
    this.setState({
      format: e.toLowerCase(),
    });
    console.log("e ", e);
  }
  render() {
    const colorBoxes = this.props.palette.colors[this.state.level].map((c) => (
      <ColorBox key={c.color} background={c[this.state.format]} name={c.name} />
    ));
    return (
      <div className="Palette">
        <NavBar
          level={this.state.level}
          changeLevel={this.changeLevel}
          handleFormatChange={this.changeFormat}
        />
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default Palette;
