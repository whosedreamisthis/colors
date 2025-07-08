import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';
import './ColorBox.css';
export default function ColorBox({
	name,
	background,
	paletteId,
	colorId,
	showLink,
}) {
	const clipboard = useClipboard();
	const [copied, setCopied] = useState(false);

	const changeCopyState = () => {
		setCopied(true);
		clipboard.copy(background);
		setTimeout(() => {
			setCopied(false);
		}, 1500);
	};
	return (
		<div
			style={{ background }}
			className="ColorBox"
			onClick={() => changeCopyState()}
		>
			<div
				className={`copy-overlay ${copied && 'show'}`}
				style={{ background }}
			/>
			<div className={`copy-msg ${copied && 'show'}`}>
				<h1>Copied!</h1>
				<p>{background}</p>
			</div>
			<div className="copy-container">
				<div className="box-content">
					<span>{name}</span>
				</div>
				<button className="copy-button">Copy</button>
			</div>
			{showLink && (
				<Link
					to={`/palette/${paletteId}/${colorId}`}
					onClick={(e) => e.stopPropagation()}
				>
					<span className="see-more">More</span>
				</Link>
			)}
		</div>
	);
}
