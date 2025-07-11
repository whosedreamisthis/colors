import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import styles from './styles/PaletteList.module.scss';
const PaletteList = memo(function PaletteList({ palettes, deletePalette }) {
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [deletingId, setDeletingId] = useState('');
	const [paletteToFadeOut, setPaletteToFadeOut] = useState(''); // New state for the palette to fade out

	const openDialog = useCallback((id) => {
		setOpenDeleteDialog(true);
		setDeletingId(id);
	}, []); // Empty dependency array: this function never changes

	const closeDialog = useCallback(() => {
		setOpenDeleteDialog(false);
		setDeletingId('');
	}, []); // Empty dependency array: this function never changes

	const handleConfirmDelete = useCallback(() => {
		setPaletteToFadeOut(deletingId);
		closeDialog();
	}, [deletingId, closeDialog]);

	return (
		<div className={styles.root}>
			<div className={styles.container}>
				<nav className={styles.nav}>
					<h1 className={styles.heading}>React Colors</h1>
					<Link to="/palette/new">Create Palette</Link>
				</nav>
				<div className={styles.palettes}>
					{palettes.map((palette) => (
						<Link
							className={styles.linkNoUnderline}
							key={palette.paletteName}
							to={`palette/${palette.id}`}
						>
							<MiniPalette
								{...palette}
								deletePalette={deletePalette}
								// deletePalette={openDialog}
								openDialog={openDialog}
								isDeleting={paletteToFadeOut === palette.id}
							/>
						</Link>
					))}
				</div>
			</div>
			<Dialog open={openDeleteDialog} onClose={closeDialog}>
				<DialogTitle>Delete Palette?</DialogTitle>
				<List>
					<ListItem
						button="true"
						// onClick={() => {
						// 	deletePalette(deletingId);
						// 	setIsDeleting(true);
						// 	closeDialog();
						// }}
						onClick={handleConfirmDelete}
						style={{
							cursor: 'pointer',
						}}
					>
						<ListItemAvatar>
							<Avatar
								style={{
									backgroundColor: '#b3d8fb',
									color: '#5976ff',
								}}
							>
								<CheckIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText>Delete</ListItemText>
					</ListItem>
					<ListItem
						style={{
							cursor: 'pointer',
						}}
						button="true"
						onClick={closeDialog}
					>
						<ListItemAvatar>
							<Avatar
								style={{
									backgroundColor: '#ffb2a1',
									color: '#eb3d30',
								}}
							>
								<CloseIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText>Cancel</ListItemText>
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
});
export default PaletteList;
