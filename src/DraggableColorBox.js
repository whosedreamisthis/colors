import styles from './styles/DraggableColorBox.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import chroma from 'chroma-js';
export default function DraggableColorBox({ color, name, onClick }) {
	const textColor = chroma(color).luminance() < 0.25 ? 'white' : 'black';

	//const isLightColor = chroma(color).luminance() > 0.5;
	return (
		<div className={styles.root} style={{ backgroundColor: color }}>
			<div className={styles.boxContent}>
				<span style={{ color: textColor }}>{name}</span>
				<DeleteIcon
					onClick={onClick}
					className={styles.deleteIcon}
					style={{ color: textColor }}
				/>
			</div>
		</div>
	);
}
