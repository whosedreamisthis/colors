import React, { Component } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';
function findPalette(id) {
	return seedColors.find((palette) => palette.id === id);
}
function PalettePage() {
	// useParams() is called INSIDE a component that is rendered BY a Route
	const { id } = useParams();
	console.log('ID from useParams in PalettePage:', id); // Debug here

	// Use the id to find and generate the palette
	const foundPalette = findPalette(id);
	console.log(foundPalette);
	const fullPalette = foundPalette ? generatePalette(foundPalette) : null;

	if (!fullPalette) {
		// Handle case where palette is not found (e.g., show a 404 page)
		return <h1>Palette Not Found!</h1>;
	}

	return <Palette palette={fullPalette} />;
}

function App() {
	const { id } = useParams();
	const foundPalette = findPalette(id);
	return (
		<Routes>
			<Route path="/" element={<PaletteList palettes={seedColors} />} />
			<Route path="/palette/:id" element={<PalettePage />} />

			<Route
				path="palette/:paletteId/:colorId"
				element={<SingleColorPalette />}
			/>
		</Routes>
		// <div>
		// 	<Palette palette={generatePalette(seedColors[4])} />
		// </div>
	);
}

export default App;
