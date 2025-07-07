import React, { Component, useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';
function Palette({ palette }) {
	const [level, setLevel] = useState(500);
	const [format, setFormat] = useState('hex');

	const colorBoxes = palette.colors[level].map((color) => {
		return (
			<ColorBox
				key={color.id}
				background={color[format]}
				name={color.name}
			/>
		);
	});
	function changeLevel(level) {
		setLevel(level);
	}
	function changeFormat(val) {
		setFormat(val);
		console.log(val);
	}
	return (
		<div className="Palette">
			<Navbar
				level={level}
				changeLevel={changeLevel}
				changeFormat={changeFormat}
			/>
			<div className="Palette-colors">{colorBoxes}</div>
			{/* footer */}
		</div>
	);
}

export default Palette;
