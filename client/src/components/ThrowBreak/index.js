import React, { useRef } from 'react';

import './styles.scss';

const ThrowBreak = () => {
	const videoRef = useRef();
	const canvasRef = useRef();

	const drawCanvas = (video, context, controls) => {
		const { canvas } = context;

		context.drawImage(video, 0, 0, canvas.width, canvas.height);

		controls.forEach(button => {
			context.beginPath();
			context.rect(button.x, button.y, button.width, button.height);
			context.fillStyle = button.color;
			context.fill();
		})

		if (video.paused || video.ended) {
			return;
		}

		setTimeout(() => {
			drawCanvas(video, context, controls);
		})
	}

	const isIntersect = (pos, control) => {
		return (pos.x > control.x && pos.x < (control.x + control.width))
			&& (pos.y > control.y && pos.y < (control.y + control.height));
	};

	const initGame = () => {
		const video = videoRef.current;
		const canvas = canvasRef.current;
		const ratio = canvas.clientWidth / video.videoWidth;
		const context = canvas.getContext('2d');

		canvas.width = video.videoWidth * ratio;
		canvas.height = video.videoHeight * ratio;

		const controls = [
			{
				id: 1,
				x: 0,
				y: 0,
				width: canvas.width / 2,
				height: canvas.height - canvas.height / 3,
				color: 'rgba(255, 0, 0, .25)',
			},
			{
				id: 2,
				x: canvas.width / 2,
				y: 0,
				width: canvas.width / 2,
				height: canvas.height - canvas.height / 3,
				color: 'rgba(0, 0, 255, .25)',
			},
			{
				id: 3,
				x: 0,
				y: canvas.height / 3 * 2,
				width: canvas.width,
				height: canvas.height / 3,
				color: 'rgba(255, 255, 0, .25)',
			},
		];

		const handleCanvasClick = event => {
			console.log(event, canvas.height)
			const mousePoint = {
				x: event.clientX / ratio,
				y: event.clientY / ratio,
			};

			const clickedControl = controls.find(control => {
				return isIntersect(mousePoint, control);
			});

			console.log(clickedControl);
		};

		canvas.onclick = handleCanvasClick;
		canvas.requestFullscreen();

		setTimeout(() => {
			video.play();
			drawCanvas(video, context, controls);
		}, 2000);
	};

	return (
		<div className="Throwbreak">
			<video ref={videoRef} preload="true" width="100%">
				<source src="/assets/throws/1.mp4" type="video/mp4" />
			</video>
			<div className="Throwbreak__wrapper">
				<canvas className="Throwbreak__canvas" ref={canvasRef}></canvas>
			</div>
			<button onClick={initGame} type="button">
				test
			</button>
		</div>
	);
};

export default ThrowBreak;
