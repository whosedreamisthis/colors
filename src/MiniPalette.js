import React, { useState, useEffect, memo } from 'react';
import styles from './MiniPalette.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
const MiniPalette = memo(function MiniPalette({
	paletteName,
	emoji,
	id,
	colors,
	handleClick,
	deletePalette,
	openDialog,
	isDeleting,
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
	useEffect(() => {
		if (isDeleting) {
			setIsFadingOut(true); // Start the fade-out animation
			const animationDuration = 500; // Match your CSS transition duration
			setTimeout(() => {
				deletePalette(id); // Call the actual delete function after animation
			}, animationDuration);
		}
	}, [isDeleting, id, deletePalette]);
	const onDeletePalette = (e) => {
		e.preventDefault();
		openDialog(id);

		// setIsFadingOut(true); // Start the fade-out animation
		// // Set a timeout to call the actual deletePalette function
		// // The duration should match the CSS transition duration
		// const animationDuration = 500; // 0.5s from CSS
		// setTimeout(() => {
		// 	deletePalette(id); // Call the parent's delete function
		// }, animationDuration);
	};
	console.log('RENDERING', paletteName);
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
				<span className={styles.emoji}>
					{typeof emoji === 'object' && emoji !== null && emoji.emoji
						? emoji.emoji // If it's an object with an 'emoji' property, use that
						: emoji}{' '}
					{/* Otherwise, assume it's already the string */}
				</span>
			</h5>
		</div>
	);
});

export default MiniPalette;
