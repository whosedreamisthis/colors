// NewPaletteForm.js

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar'; // Import MuiAppBar for base AppBar
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm } from 'react-material-ui-form-validator';
import styles from './styles/NewPaletteForm.module.css';
import { useNavigate } from 'react-router-dom';

import { ReactSortable } from 'react-sortablejs';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import seedColors from './seedColors';

const drawerWidth = 400;

// Corrected AppBar styled component to handle the transition
const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, currentDrawerWidth }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${currentDrawerWidth}px)`,
		marginLeft: `${currentDrawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open, currentDrawerWidth }) => ({
		flexGrow: 1,
		height: 'calc(100vh)', // Account for AppBar height
		padding: 0, // Add padding for content
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflow: 'hidden',
		marginLeft: `-${currentDrawerWidth}px`,
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	})
);

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function NewPaletteForm({ savePalette, palettes, maxColors }) {
	console.log('seedColors[0].colors', seedColors[0].colors);
	const [open, setOpen] = React.useState(false); // Start with drawer closed
	const [colors, setColors] = React.useState(seedColors[0].colors);
	const [currentColor, setCurrentColor] = React.useState('teal');

	const navigate = useNavigate();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const addNewColor = (newColorName) => {
		console.log('addNewColor called:');
		console.log('  currentColor:', currentColor);
		console.log('  newColorName:', newColorName);
		if (!currentColor || typeof currentColor !== 'string') {
			console.error(
				'Attempted to add color with an invalid currentColor:',
				currentColor
			);
			// Optionally, return early or set a default color
			return;
		}
		if (
			!newColorName ||
			typeof newColorName !== 'string' ||
			newColorName.trim() === ''
		) {
			console.error(
				'Attempted to add color with an invalid newColorName:',
				newColorName
			);
			// Optionally, return early or set a default name
			return;
		}
		const newColor = { color: currentColor, name: newColorName };
		setColors([...colors, newColor]);
	};

	const handleSubmit = (newPalette) => {
		newPalette.colors = colors;
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');

		savePalette(newPalette);
		navigate('/');
	};

	React.useEffect(() => {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
			return colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			);
		});

		ValidatorForm.addValidationRule('isColorUnique', (value) => {
			return colors.every(({ color }) => color !== currentColor);
		});

		return () => {
			ValidatorForm.removeValidationRule('isColorNameUnique');
			ValidatorForm.removeValidationRule('isColorUnique');
		};
	}, [colors, currentColor]);

	const removeColor = (colorName) => {
		setColors(colors.filter((color) => color.name !== colorName));
	};

	const addRandomColor = () => {
		const allPossibleSources = [...palettes, ...seedColors];
		const allColors = allPossibleSources.map((p) => p.colors).flat();
		let rand;
		let randomColor;
		let isDuplicateColor = true;
		while (isDuplicateColor) {
			rand = Math.floor(Math.random() * allColors.length);
			randomColor = allColors[rand];
			isDuplicateColor = colors.some(
				(color) => color.name === randomColor.name
			);
		}
		setColors([...colors, randomColor]);
	};

	const paletteIsFull = colors.length >= maxColors;
	console.log(paletteIsFull, maxColors, colors.length);
	return (
		<Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
			<Drawer
				sx={{
					width: open ? drawerWidth : 0,
					display: 'flex',
					alignItems: 'center',

					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon
							style={{ color: 'rgba(0, 0, 0, 0.5)' }}
						/>
					</IconButton>
				</DrawerHeader>
				<Divider />
				<div className={styles.container}>
					<Typography variant="h4" gutterBottom>
						Design Your Palette
					</Typography>
					<div className={styles.buttons}>
						<Button
							className={styles.button}
							variant="contained"
							color="secondary"
							onClick={() => {
								setColors([]);
							}}
						>
							Clear Palette
						</Button>
						<Button
							variant="contained"
							className={styles.button}
							color="primary"
							onClick={addRandomColor}
							disabled={paletteIsFull}
						>
							Random Color
						</Button>
					</div>

					<ColorPickerForm
						paletteIsFull={paletteIsFull}
						addNewColor={addNewColor}
						currentColor={currentColor}
						setCurrentColor={setCurrentColor}
					/>
				</div>
			</Drawer>
			<Main open={open} className={styles.colorBoxesContainer}>
				<DrawerHeader />{' '}
				{/* This pushes content below the top AppBar */}
				<PaletteFormNav // This is your PaletteFormNav, which contains its own AppBar
					open={open}
					handleDrawerOpen={handleDrawerOpen} // Still pass this if PaletteFormNav needs to trigger the drawer open
					handleSubmit={handleSubmit}
					palettes={palettes}
				/>
				<ReactSortable
					tag="div"
					list={colors}
					setList={setColors}
					className={styles.sortable}
				>
					{colors.map((color) => {
						console.log(color);
						return (
							<DraggableColorBox
								key={color.name}
								color={color.color}
								name={color.name}
								onClick={() => {
									removeColor(color.name);
								}}
							/>
						);
					})}
				</ReactSortable>
			</Main>
		</Box>
	);
}
