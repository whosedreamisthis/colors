// NewPaletteForm.js

import * as React from 'react';

import { styled } from '@mui/material/styles';
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
import Button from '@mui/material/Button';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { useNavigate } from 'react-router-dom';

import { ReactSortable } from 'react-sortablejs';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
const drawerWidth = 400;

// Corrected AppBar styled component to handle the transition
const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		height: 'calc(100vh - 64px)', // Account for AppBar height
		padding: theme.spacing(3), // Add padding for content
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
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
	console.log('max colors', maxColors);
	const [open, setOpen] = React.useState(false); // Start with drawer closed
	const [colors, setColors] = React.useState(palettes[0].colors);
	const [currentColor, setCurrentColor] = React.useState('teal');

	const navigate = useNavigate();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const addNewColor = (newColorName) => {
		const newColor = { color: currentColor, name: newColorName };
		setColors([...colors, newColor]);
	};

	const handleSubmit = (newPaletteName) => {
		const newPalette = {
			paletteName: newPaletteName,
			colors: colors,
			id: newPaletteName.toLowerCase().replace(/ /g, '-'),
		};
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
		const allColors = palettes.map((p) => p.colors).flat();
		var rand = Math.floor(Math.random() * allColors.length);
		const randomColor = allColors[rand];
		setColors([...colors, randomColor]);
	};

	const paletteIsFull = colors.length >= maxColors;
	console.log(paletteIsFull, maxColors, colors.length);
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			{/* The main AppBar for the layout, containing the menu icon */}
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
					<Typography variant="h6" noWrap component="div">
						Create Palette
					</Typography>
				</Toolbar>
			</AppBar>

			<Drawer
				sx={{
					width: drawerWidth,
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
						<ChevronLeftIcon />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<Typography variant="h4">Design Your Palette</Typography>
				<div>
					<Button
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
			</Drawer>
			<Main open={open}>
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
					style={{ height: '100%' }}
				>
					{colors.map((color) => {
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
