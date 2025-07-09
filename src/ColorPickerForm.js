import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar'; // Import MuiAppBar for base AppBar
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@mui/material/Button';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';
import PaletteFormNav from './PaletteFormNav';

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
