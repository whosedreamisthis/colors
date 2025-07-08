import React from 'react';
import styles from './DraggableColorBox.module.css';
export default function DraggableColorBox({ color, name, classes }) {
	return (
		<div className={styles.root} style={{ backgroundColor: color }}>
			{name}
		</div>
	);
}
