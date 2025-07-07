import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
function App() {
	console.log('generatePalette', generatePalette(seedColors[4]));
	return (
		<Routes>
			<Route path="/" element={<h1>PALETTE LIST GOES HERE</h1>} />
			<Route path="/palette/:id" element={<h1>Individual Palette</h1>} />
		</Routes>
		// <div>
		// 	<Palette palette={generatePalette(seedColors[4])} />
		// </div>
	);
}

export default App;
