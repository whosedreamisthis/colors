import React, { Component } from "react";
import "rc-slider/assets/index.css";
import "./NavBar.css";
import Slider from "rc-slider";
import { MenuItem, Select } from "@mui/material";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex" };
    this.handleFormatChange = this.handleFormatChange.bind(this);
  }
  handleFormatChange(e) {
    this.setState({
      format: e.target.value,
    });
    this.props.handleFormatChange(e.target.value);
  }
  render() {
    const { level, changeLevel } = this.props;
    return (
      <header className="NavBar">
        <div className="logo">
          <a href="#">reactcolorpicker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onChangeComplete={changeLevel}
            />
          </div>
        </div>
        <div className="select-container">
          <Select
            label="Color"
            value={this.state.format}
            onChange={this.handleFormatChange}
          >
            <MenuItem value={"hex"}>hex - #ffffff</MenuItem>
            <MenuItem value={"rgb"}>rgb -rgb(255,255,255)</MenuItem>
            <MenuItem value={"rgba"}>rgba - rgba(255,255,255,1)</MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}
export default NavBar;
