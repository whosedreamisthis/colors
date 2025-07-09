import React from 'react';
import styles from './DraggableColorBox.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
export default function DraggableColorBox({ color, name, onClick }) {
	return (
		<div className={styles.root} style={{ backgroundColor: color }}>
			<div className={styles.boxContent}>
				<span>{name}</span>
				<DeleteIcon onClick={onClick} className={styles.deleteIcon} />
			</div>
		</div>
	);
}
