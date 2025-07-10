import React, { Component, useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

function App() {
	const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));

	const [palettes, setPalettes] = React.useState(savedPalettes || seedColors);
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
	function findPalette(id) {
		return palettes.find((palette) => palette.id === id);
	}
	function SingleColorPaletteWrapper() {
		const { paletteId, colorId } = useParams();
		const foundPalette = findPalette(paletteId);

		if (!foundPalette) {
			return <h1>Palette Not Found!</h1>;
		}

		// THIS IS THE CRUCIAL PART: Generate the full palette before passing it
		const generatedFullPalette = generatePalette(foundPalette); // <--- generatePalette here

		return <SingleColorPalette palette={generatedFullPalette} />;
	}

	useEffect(() => {
		syncLocalStorage();
	}, [palettes]);

	function savePalette(newPalette) {
		setPalettes([...palettes, newPalette]);
	}

	const syncLocalStorage = () => {
		console.log('sync', palettes);
		window.localStorage.setItem('palettes', JSON.stringify(palettes));
	};
	return (
		<Routes>
			<Route
				path="/palette/new"
				element={
					<NewPaletteForm
						savePalette={savePalette}
						palettes={palettes}
						maxColors={20}
					/>
				}
			/>
			<Route path="/" element={<PaletteList palettes={palettes} />} />
			<Route path="/palette/:id" element={<PalettePage />} />

			<Route
				path="/palette/:paletteId/:colorId"
				element={<SingleColorPaletteWrapper />}
			/>
		</Routes>
		// <div>
		// 	<Palette palette={generatePalette(seedColors[4])} />
		// </div>
	);
}

export default App;
