import React, { Component, useState } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Palette.css';
function Palette({ palette }) {
	const [level, setLevel] = useState(500);
	const colorBoxes = palette.colors[level].map((color) => {
		return <ColorBox background={color.hex} name={color.name} />;
	});
	function changeLevel(level) {
		setLevel(level);
	}
	return (
		<div className="Palette">
			<div className="slider">
				<Slider
					defaultValue={level}
					min={100}
					max={900}
					step={100}
					onChangeComplete={changeLevel}
				/>
			</div>
			<div className="Palette-colors">{colorBoxes}</div>
			{/* footer */}
		</div>
	);
}

export default Palette;
