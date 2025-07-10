import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import styles from './PaletteList.module.scss';
export default function PaletteList({ palettes, deletePalette }) {
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const openDialog = () => {
		setOpenDeleteDialog(true);
	};
	const closeDialog = () => {
		setOpenDeleteDialog(false);
	};
	const handleDeleteClick = () => {
		//onDeleteConfirm(); // Call the function to actually delete
		//onClose(); // Close the dialog
	};

	const handleCancelClick = () => {
		//onClose(); // Just close the dialog
	};
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
								// deletePalette={deletePalette}
								deletePalette={openDialog}
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
						onClick={handleDeleteClick}
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
}
