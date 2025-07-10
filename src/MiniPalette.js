import React from 'react';
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
		deletePalette(id);
	};
	return (
		<div className={styles.root} onClick={handleClick}>
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
