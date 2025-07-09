import React from 'react';
import { ChromePicker } from 'react-color';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
		<div>
			<ChromePicker
				color={currentColor}
				onChangeComplete={handleColorChangeComplete}
			/>
			<ValidatorForm
				onSubmit={() => {
					addNewColor(newColorName);
					setNewColorName('');
				}}
			>
				<TextValidator
					value={newColorName}
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
