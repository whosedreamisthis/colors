import * as React from 'react';
import { styled, useTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
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
const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme }) => ({
		flexGrow: 1,
		height: 'calc(100vh - 64px)',
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		variants: [
			{
				props: ({ open }) => open,
				style: {
					transition: theme.transitions.create('margin', {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen,
					}),
					marginLeft: 0,
				},
			},
		],
	})
);

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	variants: [
		{
			props: ({ open }) => open,
			style: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: `${drawerWidth}px`,
				transition: theme.transitions.create(['margin', 'width'], {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
		},
	],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function NewPaletteForm({ savePalette, palettes }) {
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const [currentColor, setCurrentColor] = React.useState('teal'); // Initial color (purple hex)
	const [colors, setColors] = React.useState([]);
	const [newColorName, setNewColorName] = React.useState('');
	const [newPaletteName, setNewPaletteName] = React.useState('');
	const navigate = useNavigate();
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const handleColorChangeComplete = (newColor) => {
		// newColor object contains { hex, rgb, hsl, hsv }
		setCurrentColor(newColor.hex); // Update state with the hex value
		console.log('New color selected:', newColor);
	};
	const addNewColor = () => {
		const newColor = { color: currentColor, name: newColorName };
		setColors([...colors, newColor]);
		setNewColorName('');
	};

	const handleChange = (e) => {
		setNewColorName(e.target.value);
	};

	const handlePaletteNameChange = (e) => {
		setNewPaletteName(e.target.value);
	};
	const handleSubmit = () => {
		console.log('handlesubmit', newPaletteName);
		const newPalette = {
			paletteName: newPaletteName,
			colors: colors,
			id: newPaletteName.toLowerCase().replace(/ /g, '-'),
		};
		savePalette(newPalette);
		navigate('/');
	};

	React.useEffect(() => {
		// Validation rule for unique color names
		ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
			// Corrected: 'colors' refers to the state variable
			return colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			);
		});

		// Validation rule for unique color values (optional, but often useful)
		ValidatorForm.addValidationRule('isColorUnique', (value) => {
			// Converts current color object to a string for comparison
			const currentColorString = `rgba(${currentColor.r},${currentColor.g},${currentColor.b},${currentColor.a})`;
			return colors.every(({ color }) => {
				// Assuming stored colors are also RGBA objects or hex strings
				// const storedColorString =
				// 	typeof color === 'string'
				// 		? color
				// 		: `rgba(${color.r},${color.g},${color.b},${color.a})`;
				// return storedColorString !== currentColorString;
				return color !== currentColor;
			});
		});

		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
			// Corrected: 'colors' refers to the state variable
			return palettes.every(
				(palette) =>
					palette.paletteName.toLowerCase() !== value.toLowerCase()
			);
		});

		// Cleanup function (optional, but good practice if rules might change)
		return () => {
			ValidatorForm.removeValidationRule('isColorNameUnique');
			ValidatorForm.removeValidationRule('isColorUnique');
			ValidatorForm.removeValidationRule('isPaletteNameUnique');
		};
	}, [colors, currentColor]); // Dependencies: re-add rules if colors or currentColor change

	return (
		<Box sx={{ display: 'flex' }}>
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
					<Typography variant="h6" noWrap component="div">
						Persistent drawer
					</Typography>

					<ValidatorForm onSubmit={handleSubmit}>
						<TextValidator
							label="Palatte Name"
							value={newPaletteName}
							name="newPaletteName"
							onChange={handlePaletteNameChange}
							validators={['required', 'isPaletteNameUnique']}
							errorMessages={[
								'Enter palette name',
								'Name already used.',
							]}
						/>
						<Button
							variant="contained"
							color="primary"
							type="submit"
						>
							Save Palette
						</Button>
					</ValidatorForm>
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
					<Button variant="contained" color="secondary">
						Clear Palette
					</Button>
					<Button variant="contained" color="primary">
						Random Color
					</Button>
				</div>
				<ChromePicker
					color={currentColor}
					onChangeComplete={handleColorChangeComplete}
				/>
				<ValidatorForm onSubmit={addNewColor}>
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
						style={{ backgroundColor: currentColor }}
						type="submit"
					>
						Add Color
					</Button>
				</ValidatorForm>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />

				{colors.map((color) => {
					return (
						<DraggableColorBox
							color={color.color}
							name={color.name}
						/>
					);
				})}
			</Main>
		</Box>
	);
}
