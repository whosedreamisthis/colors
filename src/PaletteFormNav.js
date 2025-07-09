// PaletteFormNav.js

import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles'; // Import styled
import Box from '@mui/material/Box'; // Import Box
import MuiAppBar from '@mui/material/AppBar'; // Import MuiAppBar
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import CssBaseline from '@mui/material/CssBaseline';

import styles from './PaletteFormNav.module.css';
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 400; // Define drawerWidth here as well if needed for AppBar styling

const AppBar = styled(MuiAppBar, {
	// Styled AppBar for PaletteFormNav
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	flexDirection: 'row', // Ensure items are in a row
	justifyContent: 'space-between', // Distribute space
	alignItems: 'center', // Vertically align items
	height: '64px', // Set a fixed height for consistency with default AppBar

	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export default function PaletteFormNav({
	open,
	handleDrawerOpen,
	handleSubmit,
	palettes,
}) {
	const [newPaletteName, setNewPaletteName] = React.useState('');
	useEffect(() => {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
			return palettes.every(
				(palette) =>
					palette.paletteName.toLowerCase() !== value.toLowerCase()
			);
		});
		return () => {
			ValidatorForm.removeValidationRule('isPaletteNameUnique');
		};
	}, [palettes]);

	return (
		<div className={styles.root}>
			<CssBaseline />

			<AppBar
				className={styles.AppBar}
				position="fixed"
				open={open}
				color="default"
			>
				<Toolbar
					sx={{ justifyContent: 'space-between', width: '100%' }}
				>
					{' '}
					{/* Ensure Toolbar fills AppBar and justify content */}
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<IconButton
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
							<MenuIcon style={{ color: 'rgba(0,0,0,0.5)' }} />
						</IconButton>
						<Typography variant="h6" noWrap component="div">
							Create Palette
						</Typography>
					</Box>
					<PaletteMetaForm handleSubmit={handleSubmit} />
				</Toolbar>
			</AppBar>
		</div>
	);
}
