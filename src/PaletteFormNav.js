import React, { use, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@mui/material/Button';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './NewPaletteForm.module.css';
import { ReactSortable } from 'react-sortablejs';

export default function PaletteFormNav({
	open,
	handleDrawerOpen,
	handleSubmit,
	palettes,
}) {
	const [newPaletteName, setNewPaletteName] = React.useState('');
	useEffect(() => {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
			// Corrected: 'colors' refers to the state variable
			return palettes.every(
				(palette) =>
					palette.paletteName.toLowerCase() !== value.toLowerCase()
			);
		});
		return () => {
			ValidatorForm.removeValidationRule('isPaletteNameUnique');
		};
	}, [palettes]);
	const handlePaletteNameChange = (e) => {
		setNewPaletteName(e.target.value);
		console.log('handle palette name change', e.target.value);
	};
	return (
		<div>
			<CssBaseline />
			<AppBar position="fixed" open={open} color="default">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={[
							{
								mr: 2,
							},
							open && { display: 'none' },
						]}
					>
						<MenuIcon />
					</IconButton>
					<div className={styles.newPaletteHeader}>
						<Typography variant="h6" noWrap component="div">
							Persistent drawer
						</Typography>

						<ValidatorForm
							onSubmit={() => {
								handleSubmit(newPaletteName);
							}}
						>
							<div className={styles.savePaletteForm}>
								<TextValidator
									label="Palatte Name"
									value={newPaletteName}
									name="newPaletteName"
									onChange={handlePaletteNameChange}
									validators={[
										'required',
										'isPaletteNameUnique',
									]}
									errorMessages={[
										'Enter palette name',
										'Name already used',
									]}
								/>
								<Button
									variant="contained"
									color="primary"
									type="submit"
								>
									Save Palette
								</Button>
								{/* <Link to="/"> */}
								<Button
									variant="contained"
									color="secondary"
									component={Link} // <-- Use the component prop
									to="/"
								>
									Go Back
								</Button>
								{/* </Link> */}
							</div>
						</ValidatorForm>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
