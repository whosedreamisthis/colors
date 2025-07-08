import React, { Component, useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';
function Palette({ palette }) {
	const { paletteName, colors, emoji } = palette;
	const [level, setLevel] = useState(500);
	const [format, setFormat] = useState('hex');

	const colorBoxes = colors[level].map((color) => {
		return (
			<ColorBox
				key={color.id}
				background={color[format]}
				name={color.name}
				paletteId={palette.id}
				colorId={color.id}
				showLink={true}
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
			<footer className="Palette-footer">
				{paletteName}
				<span className="emoji">{emoji}</span>
			</footer>
		</div>
	);
}

export default Palette;
