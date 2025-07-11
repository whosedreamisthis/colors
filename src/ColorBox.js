import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';
import './styles/ColorBox.scss';
import chroma from 'chroma-js';
export default function ColorBox({
	name,
	background,
	paletteId,
	colorId,
	showLink,
	showFullPalette,
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
	const isDarkColor = chroma(background).luminance() < 0.25;
	const isLightColor = chroma(background).luminance() > 0.5;

	return (
		<div
			style={{ background }}
			className={`ColorBox ${
				showFullPalette ? '' : 'singleColorPalette'
			}`}
			onClick={() => changeCopyState()}
		>
			<div
				className={`copy-overlay ${copied && 'show'}`}
				style={{ background }}
			/>
			<div className={`copy-msg ${copied && 'show'}`}>
				<h1>Copied!</h1>
				<p className={`${isLightColor && 'dark-text'}`}>{background}</p>
			</div>
			<div className="copy-container">
				<div className="box-content">
					<span className={`${isDarkColor && 'light-text'}`}>
						{name}
					</span>
				</div>
				<button
					className={`copy-button ${isLightColor && 'dark-text'}`}
				>
					Copy
				</button>
			</div>
			{showLink && (
				<Link
					to={`/palette/${paletteId}/${colorId}`}
					onClick={(e) => e.stopPropagation()}
				>
					<span className={`see-more ${isLightColor && 'dark-text'}`}>
						More
					</span>
				</Link>
			)}
		</div>
	);
}
