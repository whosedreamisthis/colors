import React, { Component, useState } from 'react';
import { useParams } from 'react-router-dom';
export default function SingleColorPalette({ palette }) {
	const { paletteId, colorId } = useParams();
	const gatherShades = (palette, colorToFilterBy) => {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.concat(
				allColors[key].filter((color) => {
					return color.id === colorToFilterBy;
				})
			);
		}
		console.log('shades', shades.slice(1));

		return shades.slice(1);
	};
	const { _shades, set_Shades } = useState(gatherShades(palette, colorId));

	return (
		<div>
			<h1>single color palette</h1>
		</div>
	);
}
