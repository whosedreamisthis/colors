import React, { useState } from 'react';
import styles from './MiniPalette.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
function MiniPalette({
	paletteName,
	emoji,
	id,
	colors,
	handleClick,
	deletePalette,
}) {
	const [isFadingOut, setIsFadingOut] = useState(false);
	const miniColorBoxes = colors.map((color) => {
		return (
			<div
				className={styles.miniColor}
				style={{ backgroundColor: color.color }}
				key={color.name}
			></div>
		);
	});
	const onDeletePalette = (e) => {
		e.preventDefault();
		setIsFadingOut(true); // Start the fade-out animation

		// Set a timeout to call the actual deletePalette function
		// The duration should match the CSS transition duration
		const animationDuration = 500; // 0.5s from CSS
		setTimeout(() => {
			deletePalette(id); // Call the parent's delete function
		}, animationDuration);
	};
	return (
		<div
			className={`${styles.root} ${isFadingOut ? styles.fadeOut : ''}`}
			onClick={handleClick}
		>
			<DeleteIcon
				className={styles.deleteIcon}
				style={{ transition: 'all 0.1s ease-in-out' }}
				onClick={onDeletePalette}
			/>
			<div className={styles.colors}>{miniColorBoxes}</div>
			<h5 className={styles.title}>
				<span className={styles.paletteName}>{paletteName}</span>
				<span className={styles.emoji}>{emoji}</span>
			</h5>
		</div>
	);
}

export default MiniPalette;
