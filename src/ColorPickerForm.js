import React from 'react';
import { ChromePicker } from 'react-color';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styles from './styles/ColorPickerForm.module.css';
export default function ColorPickerForm({
	paletteIsFull,
	addNewColor,
	currentColor,
	setCurrentColor,
}) {
	const [newColorName, setNewColorName] = React.useState('');

	const handleChange = (e) => {
		setNewColorName(e.target.value);
	};

	const handleColorChangeComplete = (newColor) => {
		setCurrentColor(newColor.hex);
		console.log('New color selected:', newColor);
	};
	return (
		<div
			style={{
				position: 'relative',
				width: '100%',
				paddingLeft: '30px',
				paddingRight: '30px',
			}}
		>
			<ChromePicker
				color={currentColor}
				onChangeComplete={handleColorChangeComplete}
				className={styles.picker}
				width="100%"
				style={{ width: '100%' }}
			/>
			<ValidatorForm
				onSubmit={() => {
					addNewColor(newColorName);
					setNewColorName('');
				}}
			>
				<TextValidator
					className={styles.colorInput}
					value={newColorName}
					variant="filled"
					placeholder="Color Name"
					onChange={handleChange}
					validators={[
						'required',
						'isColorNameUnique',
						'isColorUnique',
					]}
					errorMessages={[
						'Enter a color name',
						'Color name must be unique',
						'Color must be unique',
					]}
				/>
				<Button
					className={styles.addColor}
					variant="contained"
					style={{
						backgroundColor: paletteIsFull ? 'grey' : currentColor,
					}}
					type="submit"
					disabled={paletteIsFull}
				>
					{paletteIsFull ? 'Palette Full' : 'Add Color'}
				</Button>
			</ValidatorForm>
		</div>
	);
}
