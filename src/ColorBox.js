import React, { Component } from 'react';

import { useClipboard } from 'use-clipboard-copy';
import './ColorBox.css';
export default function ColorBox({ name, background }) {
	const clipboard = useClipboard();

	return (
		<div style={{ background }} className="ColorBox">
			<div className="copy-container">
				<div className="box-content">
					<span>{name}</span>
				</div>
				<button
					className="copy-button"
					onClick={() => clipboard.copy(background)}
				>
					Copy
				</button>
			</div>
			<span className="see-more">More</span>
		</div>
	);
}
