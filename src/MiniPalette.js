import React from 'react';
import styles from './MiniPalette.module.css';
function MiniPalette({ paletteName, emoji }) {
	return (
		<div className={styles.root}>
			<div className={styles.colors}></div>
			<h5 className={styles.title}>
				{paletteName}
				<span className={styles.emoji}>{emoji}</span>
			</h5>
		</div>
	);
}

export default MiniPalette;
