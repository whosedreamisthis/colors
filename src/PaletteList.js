import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import styles from './PaletteList.module.css';
export default class PaletteList extends Component {
	render() {
		const { palettes } = this.props;
		return (
			<div className={styles.root}>
				<div className={styles.container}>
					<nav className={styles.nav}>
						<h1>React Colors</h1>
					</nav>
					<div className={styles.palettes}>
						{palettes.map((palette) => (
							<Link
								key={palette.paletteName}
								to={`palette/${palette.id}`}
							>
								<MiniPalette {...palette} />
							</Link>
						))}
					</div>
				</div>
			</div>
		);
	}
}
