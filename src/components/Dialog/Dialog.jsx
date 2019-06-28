import React, { useMemo } from 'react';
import $ from './_constants';
import { Modal, Fade, Paper } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const Dialog = ({
	id,
	children,
	refer,
	open,
	onClose,
	onEscapeKeyDown,
	onOutsideClick,
	onEnter,
	onEntering,
	onEntered,
	onExit,
	onExiting,
	onExited,
	disableEscapeKeyDown = false,
	disableOutsideClick = false,
	modalProps = {},
	backdropProps = {},
	TransitionComponent = Fade,
	transitionDuration,
	TransitionProps = {},
	fullScreen,
	fullWidth,
	maxWidth,
	InnerComponent = Paper,
	innerProps = {},
	scroll
}) => {
	const mainStyle = useMemo(() => {
		return {
			flexShrink: '0',
			backgroundColor: 'rgba(0, 0, 0, 0.12);'
		};
	}, []);

	innerProps.style = useMemo(
		() => {
			return {
				...(innerProps.style ? innerProps.style : {}),
				backgroundColor: open ? '#f0e68c' : '#ff69b4',
				width: '256px',
				height: '400px',
				// width: '100%',
				overflow: 'hidden',
				zIndex: 2000,
				position: 'absolute',
				top: '50px',
				left: '200px'
			};
		},
		[ innerProps.style ]
	);

	return (
		<Modal
			open={open}
			closeAfterTransition
			onEscapeKeyDown={onEscapeKeyDown}
			onOutsideClick={onOutsideClick}
			id={id}
			{...modalProps}
		>
			<TransitionComponent
				in={open}
				duration={transitionDuration}
				onEnter={onEnter}
				onEntering={onEntering}
				onEntered={onEntered}
				onExit={onExit}
				onExiting={onExiting}
				onExited={onExited}
				{...TransitionProps}
			>
				<InnerComponent elevation={24} shape="round" {...innerProps}>
					{children}
				</InnerComponent>
			</TransitionComponent>
		</Modal>
	);
};

export default Dialog;
