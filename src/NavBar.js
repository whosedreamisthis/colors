import React, { Component } from "react";
import "rc-slider/assets/index.css";
import "./NavBar.css";
import Slider from "rc-slider";
import { MenuItem, Select, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "HEX", open: false };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  handleFormatChange(e) {
    this.setState({
      format: e.target.value,
      open: true,
    });

    this.props.handleFormatChange(e.target.value);
  }

  closeSnackbar(e) {
    this.setState({
      open: false,
    });
  }
  render() {
    const { level, changeLevel } = this.props;
    const { format, open } = this.state;
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
            value={format}
            onChange={this.handleFormatChange}
          >
            <MenuItem value={"HEX"}>hex - #ffffff</MenuItem>
            <MenuItem value={"RGB"}>rgb -rgb(255,255,255)</MenuItem>
            <MenuItem value={"RGBA"}>rgba - rgba(255,255,255,1)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Foramt Changed to {format.toUpperCase()}
            </span>
          }
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton onClick={this.closeSnackbar}>
              <CloseIcon className="CloseIcon" />
            </IconButton>,
          ]}
        />
      </header>
    );
  }
}
export default NavBar;
