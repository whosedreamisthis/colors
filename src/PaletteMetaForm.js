import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import styles from './PaletteMetaForm.module.css';
export default function PaletteMetaForm({ palettes, handleSubmit }) {
	const [open, setOpen] = React.useState(false);
	const [newPaletteName, setNewPaletteName] = React.useState('');
	const handlePaletteNameChange = (e) => {
		setNewPaletteName(e.target.value);
		console.log('handle palette name change', e.target.value);
	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div className={styles.buttons}>
			<Button variant="outlined" onClick={handleClickOpen}>
				Open form dialog
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent sx={{ paddingBottom: 0 }}>
					<DialogContentText>
						To subscribe to this website, please enter your email
						address here. We will send updates occasionally.
					</DialogContentText>
					<ValidatorForm
						onSubmit={() => {
							handleSubmit(newPaletteName);
						}}
					>
						<div className={styles.savePaletteForm}>
							<TextValidator
								label="Palette Name"
								value={newPaletteName}
								name="newPaletteName"
								onChange={handlePaletteNameChange}
								validators={['required', 'isPaletteNameUnique']}
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
						</div>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button type="submit">Subscribe</Button>
						</DialogActions>
					</ValidatorForm>
				</DialogContent>
			</Dialog>
			<Button
				variant="contained"
				color="secondary"
				component={Link}
				to="/"
			>
				Go Back
			</Button>
		</div>
	);
}
