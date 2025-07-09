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
export default function PaletteMetaForm({
	open,
	palettes,
	handleSubmit,
	hideForm,
}) {
	const [newPaletteName, setNewPaletteName] = React.useState('');
	const handlePaletteNameChange = (e) => {
		setNewPaletteName(e.target.value);
		console.log('handle palette name change', e.target.value);
	};
	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	const handleClose = () => {
		// setOpen(false);
		hideForm();
	};
	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Choose a Palette Name</DialogTitle>
				<DialogContent sx={{ paddingBottom: 0 }}>
					<DialogContentText>
						Please enter a unique name for your new palette.
					</DialogContentText>
					<ValidatorForm
						onSubmit={() => {
							handleSubmit(newPaletteName);
						}}
					>
						<div className={styles.savePaletteForm}>
							<TextValidator
								style={{ margin: '10px' }}
								label="Palette Name"
								value={newPaletteName}
								fullWidth
								name="newPaletteName"
								onChange={handlePaletteNameChange}
								validators={['required', 'isPaletteNameUnique']}
								errorMessages={[
									'Enter palette name',
									'Name already used',
								]}
							/>
						</div>
						<DialogActions style={{ marginBottom: '10px' }}>
							<Button onClick={handleClose}>Cancel</Button>
							<Button
								variant="contained"
								color="primary"
								type="submit"
							>
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</DialogContent>
			</Dialog>
		</div>
	);
}
