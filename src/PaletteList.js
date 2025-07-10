import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import styles from './PaletteList.module.scss';
export default class PaletteList extends Component {
	render() {
		const { palettes, deletePalette } = this.props;
		return (
			<div className={styles.root}>
				<div className={styles.container}>
					<nav className={styles.nav}>
						<h1>React Colors</h1>
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
								/>
							</Link>
						))}
					</div>
				</div>
			</div>
		);
	}
}
