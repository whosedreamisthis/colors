import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
class Palette extends Component {
  render() {
    const colorBoxes = this.props.colors.map((c) => (
      <ColorBox key={c.color} background={c.color} name={c.name} />
    ));
    return (
      <div className="Palette">
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default Palette;
