import React from 'react';
import styles from './DraggableColorBox.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
export default function DraggableColorBox({ color, name, classes }) {
	return (
		<div className={styles.root} style={{ backgroundColor: color }}>
			<div className={styles.boxContent}>
				<span>{name}</span>
				<DeleteIcon className={styles.deleteIcon} />
			</div>
		</div>
	);
}
