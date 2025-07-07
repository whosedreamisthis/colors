import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = { format: 'hex' };
		this.changeFormat = this.changeFormat.bind(this);
	}
	changeFormat(e) {
		this.setState({ format: e.target.value });
		this.props.changeFormat(e.target.value);
	}
	render() {
		const { level, changeLevel } = this.props;
		const { format } = this.state;
		return (
			<header className="Navbar">
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
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={format}
						label="Age"
						onChange={this.changeFormat}
					>
						<MenuItem value={'hex'}>HEX - #ffffff</MenuItem>
						<MenuItem value={'rgb'}>
							RGB - rgb(255,255,255)
						</MenuItem>
						<MenuItem value={'rgba'}>
							RGBA- rgba(255,255,255,1.0)
						</MenuItem>
					</Select>
				</div>
				{/* <FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Age</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={12}
						label="Age"
						onChange={() => {}}
					>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl> */}
			</header>
		);
	}
}

export default Navbar;
