import React, { Component, useState, useEffect, useCallback } from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // Import AnimatePresence and motion

import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

// const pageVariants = {
// 	initial: {
// 		opacity: 0,
// 	},
// 	in: {
// 		opacity: 1,
// 		transition: {
// 			type: 'tween', // 'tween' for linear animation
// 			ease: 'easeOut',
// 			duration: 0.5, // 500ms
// 		},
// 	},
// 	out: {
// 		opacity: 0,
// 		transition: {
// 			type: 'tween',
// 			ease: 'easeIn',
// 			duration: 0.5, // 500ms
// 		},
// 	},
// };
const pageVariants = {
	initial: {
		opacity: 0,
		x: '0%', // Starts off-screen to the right
	},
	in: {
		opacity: 1,
		x: '0%', // Slides in to its final position
		transition: {
			type: 'tween', // 'tween' for linear animation, 'spring' for bouncy
			ease: 'easeOut',
			duration: 0.25, // 500ms
		},
	},
	out: {
		opacity: 0,
		x: '0%', // Slides out to the left
		transition: {
			type: 'tween',
			ease: 'easeIn',
			duration: 0.25, // 500ms
		},
	},
};

function App() {
	const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));

	const [palettes, setPalettes] = React.useState(savedPalettes || seedColors);
	const location = useLocation();
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
	const syncLocalStorage = useCallback(() => {
		// Memoize syncLocalStorage
		window.localStorage.setItem('palettes', JSON.stringify(palettes));
	}, [palettes]);

	const deletePalette = useCallback(
		(id) => {
			setPalettes((prevPalettes) =>
				prevPalettes.filter((palette) => palette.id !== id)
			);
			// syncLocalStorage will be called by the useEffect hook when palettes change
		},
		[] // No dependencies, as setPalettes with functional update doesn't need 'palettes' in its dependency array
	);

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

	return (
		<AnimatePresence mode="popLayout">
			{' '}
			{/* 'wait' mode waits for the outgoing component to finish animating before the new one enters */}
			{/* motion.div is the animated component.
                The 'key' is crucial for AnimatePresence to detect when a component is added/removed.
                The 'location.pathname' or 'location.key' from react-router-dom serves as this unique key.
            */}
			<motion.div
				key={location.pathname} // Use location.pathname as the key for page transitions
				className="page" // Apply your .page styles here
				variants={pageVariants} // Apply your defined animation variants
				initial="initial"
				animate="in"
				exit="out"
			>
				<Routes location={location}>
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
					<Route
						path="/"
						element={
							<PaletteList
								palettes={palettes}
								deletePalette={deletePalette}
							/>
						}
					/>
					<Route path="/palette/:id" element={<PalettePage />} />

					<Route
						path="/palette/:paletteId/:colorId"
						element={<SingleColorPaletteWrapper />}
					/>
					<Route path="*" element={<h1>Page Not Found!</h1>} />
				</Routes>
			</motion.div>
		</AnimatePresence>
	);
}

export default App;
