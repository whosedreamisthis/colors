import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles/Navbar.module.scss';
import { Link } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = { format: 'hex', open: false };
		this.changeFormat = this.changeFormat.bind(this);
		this.closeSnackbar = this.closeSnackbar.bind(this);
	}

	changeFormat(e) {
		this.setState({ format: e.target.value });
		this.props.changeFormat(e.target.value);
		this.setState({ open: true });
	}
	closeSnackbar() {
		this.setState({ open: false });
	}
	render() {
		const { level, changeLevel } = this.props;
		const { format, open } = this.state;
		const action = (
			<React.Fragment>
				<IconButton
					size="small"
					aria-label="close"
					onClick={this.handleClose}
				>
					<CloseIcon color="inherit" fontSize="small" />
				</IconButton>
			</React.Fragment>
		);

		return (
			<header className={styles.Navbar}>
				<div className={styles.logo}>
					<Link to="/">colors</Link>
				</div>
				{level && (
					<div className={styles.sliderContainer}>
						<span>Level: {level}</span>
						<div className={styles.slider}>
							<Slider
								defaultValue={level}
								min={100}
								max={900}
								step={100}
								onChangeComplete={changeLevel}
							/>
						</div>
					</div>
				)}

				<div className={styles.selectContainer}>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={format}
						label="Age"
						onChange={this.changeFormat}
					>
						<MenuItem value={'hex'}>HEX - #ffffff</MenuItem>
						<MenuItem value={'rgb'}>
							RGB - rgb(255,255,255)
						</MenuItem>
						<MenuItem value={'rgba'}>
							RGBA- rgba(255,255,255,1.0)
						</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={open}
					autoHideDuration={3000}
					onClose={this.closeSnackbar}
					message={
						<span id="message-id">
							Format Changed to {format.toUpperCase()}
						</span>
					}
					// ContentProps={}
					action={[
						<IconButton
							onClick={this.closeSnackbar}
							color="inherit"
							key="close"
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>,
					]}
				/>
			</header>
		);
	}
}

export default Navbar;
