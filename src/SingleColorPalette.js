import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

export default function SingleColorPalette({ palette }) {
	const { paletteId, colorId } = useParams();
	const [format, setFormat] = useState('hex');

	// Debugging the incoming palette prop
	console.log('--- SingleColorPalette Render Start ---');
	console.log('Incoming palette prop:', palette);
	console.log('colorId param:', colorId);
	function changeFormat(val) {
		setFormat(val);
		console.log(val);
	}
	const gatherShades = (p, ctf) => {
		console.log('   gatherShades called. p:', p, 'ctf:', ctf);

		// Crucial initial check: if palette is not an object or is null/undefined
		if (!p || typeof p !== 'object' || p === null) {
			console.error(
				'   gatherShades ERROR: Incoming palette is invalid or undefined.',
				p
			);
			return []; // Return empty array to avoid .map() errors downstream
		}
		// Further check for palette.colors structure
		if (
			!p.colors ||
			typeof p.colors !== 'object' ||
			Array.isArray(p.colors)
		) {
			console.error(
				'   gatherShades ERROR: palette.colors is not the expected object structure. Received:',
				p.colors
			);
			return [];
		}

		let shades = [];
		let allColors = p.colors; // This should now be the object { 50: [...], 100: [...], ... }

		for (let key in allColors) {
			if (
				Object.prototype.hasOwnProperty.call(allColors, key) &&
				Array.isArray(allColors[key])
			) {
				shades = shades.concat(
					allColors[key].filter((color) => {
						return color.id === ctf;
					})
				);
			} else {
				console.warn(
					`   gatherShades WARNING: allColors['${key}'] is not an array or not an own property. Value:`,
					allColors[key]
				);
			}
		}
		const finalShades = shades.slice(1);
		console.log('   gatherShades returning:', finalShades);
		return finalShades;
	};

	// State initialization for _shades
	const [_shades, set_Shades] = useState(() => {
		console.log('   useState initializer calling gatherShades...');
		const initialShades = gatherShades(palette, colorId);
		console.log('   useState initializer result:', initialShades);
		return initialShades;
	});

	// useEffect to re-calculate shades if palette or colorId changes
	useEffect(() => {
		console.log('--- useEffect Running ---');
		console.log(
			'  useEffect: Current _shades before update (from previous render):',
			_shades
		); // This shows state from previous render
		const newShades = gatherShades(palette, colorId);
		set_Shades(newShades);
		console.log('  useEffect: Set _shades to:', newShades);
		console.log('--- useEffect End ---');
	}, [palette, colorId]); // Depend on palette and colorId

	// This log shows _shades' value in the current render pass
	console.log(
		'Render: _shades value (immediate after useState/during current render):',
		_shades
	);

	// Map _shades to ColorBox components. This line will only run if _shades is an array.
	const colorBoxes =
		_shades && Array.isArray(_shades)
			? _shades.map((color) => (
					<ColorBox
						key={color.hex}
						name={color.name}
						background={color[format]}
						showLink={false}
					/>
			  ))
			: []; // Provide an empty array fallback

	console.log('Render: colorBoxes (array of components):', colorBoxes);
	console.log('--- SingleColorPalette Render End ---');

	return (
		<div className="SingleColorPalette Palette">
			<Navbar changeFormat={changeFormat} />
			<div className="Palette-colors">
				{colorBoxes}
				<div className="go-back ColorBox">
					<Link to={`/palette/${paletteId}`} className="back-button">
						GO BACK
					</Link>
				</div>
			</div>
			<PaletteFooter
				paletteName={palette.paletteName}
				emoji={palette.emoji}
			/>
		</div>
		// <div className="SingleColorPalette">
		// 	<h1>
		// 		{palette?.paletteName || 'Loading Palette...'} - {colorId}
		// 	</h1>
		// 	<div className="PaletteColors">
		// 		{colorBoxes.length > 0 ? (
		// 			colorBoxes
		// 		) : (
		// 			<p>
		// 				Loading or No shades found for this color. Please check
		// 				your data and URL.
		// 			</p>
		// 		)}
		// 	</div>
		// 	{/* Optional: Back button */}
		// 	{/* <Link to={`/palette/${paletteId}`} className="back-button">Go Back</Link> */}
		// </div>
	);
}
