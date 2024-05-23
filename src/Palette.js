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
  }
  render() {
    const { level, format } = this.state;
    const { palette } = this.props;
    const colorBoxes = palette.colors[level].map((c) => (
      <ColorBox key={c.id} background={c[format]} name={c.name} />
    ));

    return (
      <div className="Palette">
        <NavBar
          level={level}
          changeLevel={this.changeLevel}
          handleFormatChange={this.changeFormat}
        />
        <div className="Palette-colors">{colorBoxes}</div>
        <footer className="Palette-footer">
          {palette.paletteName}
          <span className="emoji"> {palette.emoji}</span>
        </footer>
      </div>
    );
  }
}

export default Palette;
