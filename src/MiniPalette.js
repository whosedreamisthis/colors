import React from 'react';
import styles from './MiniPalette.module.css';
function MiniPalette({ paletteName, emoji, colors, handleClick }) {
	const miniColorBoxes = colors.map((color) => {
		return (
			<div
				className={styles.miniColor}
				style={{ backgroundColor: color.color }}
				key={color.name}
			></div>
		);
	});
	return (
		<div className={styles.root} onClick={handleClick}>
			<div className={styles.colors}>{miniColorBoxes}</div>
			<h5 className={styles.title}>
				{paletteName}
				<span className={styles.emoji}>{emoji}</span>
			</h5>
		</div>
	);
}

export default MiniPalette;
