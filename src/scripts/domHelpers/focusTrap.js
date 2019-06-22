import tabbable from 'tabbable';

let activeFocusDelay;

const activeFocusTraps = (() => {
	const trapQueue = [];
	return {
		activateTrap: (trap) => {
			if (trapQueue.length > 0) {
				const activeTrap = trapQueue[trapQueue.length - 1];
				if (activeTrap !== trap) {
					activeTrap.pause();
				}
			}

			const trapIndex = trapQueue.indexOf(trap);
			if (trapIndex === -1) {
				trapQueue.push(trap);
			} else {
				// move this existing trap to the front of the queue
				trapQueue.splice(trapIndex, 1);
				trapQueue.push(trap);
			}
		},

		deactivateTrap: (trap) => {
			const trapIndex = trapQueue.indexOf(trap);
			if (trapIndex !== -1) {
				trapQueue.splice(trapIndex, 1);
			}

			if (trapQueue.length > 0) {
				trapQueue[trapQueue.length - 1].unpause();
			}
		}
	};
})();

const focusTrap = (element, userOptions) => {
	const doc = document;
	const container = typeof element === 'string' ? doc.querySelector(element) : element;

	const config = {
		returnFocusOnDeactivate: true,
		escapeDeactivates: true,
		...userOptions
	};

	const state = {
		firstTabbableNode: null,
		lastTabbableNode: null,
		nodeFocusedBeforeActivation: null,
		mostRecentlyFocusedNode: null,
		active: false,
		paused: false
	};

	const activate = (activateOptions) => {
		if (state.active) return;

		updateTabbableNodes();

		state.active = true;
		state.paused = false;
		state.nodeFocusedBeforeActivation = doc.activeElement;

		const onActivate =
			activateOptions && activateOptions.onActivate ? activateOptions.onActivate : config.onActivate;
		if (onActivate) {
			onActivate();
		}

		addListeners();
		return trap;
	};

	const deactivate = (deactivateOptions) => {
		if (!state.active) return;

		clearTimeout(activeFocusDelay);

		removeListeners();
		state.active = false;
		state.paused = false;

		activeFocusTraps.deactivateTrap(trap);

		const onDeactivate =
			deactivateOptions && deactivateOptions.onDeactivate !== undefined
				? deactivateOptions.onDeactivate
				: config.onDeactivate;
		if (onDeactivate) {
			onDeactivate();
		}

		const returnFocus =
			deactivateOptions && deactivateOptions.returnFocus !== undefined
				? deactivateOptions.returnFocus
				: config.returnFocusOnDeactivate;
		if (returnFocus) {
			delay(() => {
				tryFocus(state.nodeFocusedBeforeActivation);
			});
		}

		return trap;
	};

	const pause = () => {
		if (state.paused || !state.active) return;
		state.paused = true;
		removeListeners();
	};

	const unpause = () => {
		if (!state.paused || !state.active) return;
		state.paused = false;
		updateTabbableNodes();
		addListeners();
	};

	const addListeners = () => {
		if (!state.active) return;

		// There can be only one listening focus trap at a time
		activeFocusTraps.activateTrap(trap);

		// Delay ensures that the focused element doesn't capture the event
		// that caused the focus trap activation.
		activeFocusDelay = delay(() => {
			tryFocus(getInitialFocusNode());
		});

		doc.addEventListener('focusin', checkFocusIn, true);
		doc.addEventListener('mousedown', checkPointerDown, {
			capture: true,
			passive: false
		});
		doc.addEventListener('touchstart', checkPointerDown, {
			capture: true,
			passive: false
		});
		doc.addEventListener('click', checkClick, {
			capture: true,
			passive: false
		});
		doc.addEventListener('keydown', checkKey, {
			capture: true,
			passive: false
		});

		return trap;
	};

	const removeListeners = () => {
		if (!state.active) return;

		doc.removeEventListener('focusin', checkFocusIn, true);
		doc.removeEventListener('mousedown', checkPointerDown, true);
		doc.removeEventListener('touchstart', checkPointerDown, true);
		doc.removeEventListener('click', checkClick, true);
		doc.removeEventListener('keydown', checkKey, true);

		return trap;
	};

	const getNodeForOption = (optionName) => {
		const optionValue = config[optionName];
		let node = optionValue;
		if (!optionValue) {
			return null;
		}
		if (typeof optionValue === 'string') {
			node = doc.querySelector(optionValue);
			if (!node) {
				throw new Error('`' + optionName + '` refers to no known node');
			}
		}
		if (typeof optionValue === 'function') {
			node = optionValue();
			if (!node) {
				throw new Error('`' + optionName + '` did not return a node');
			}
		}
		return node;
	};

	const getInitialFocusNode = () => {
		let node;
		if (getNodeForOption('initialFocus') !== null) {
			node = getNodeForOption('initialFocus');
		} else if (container.contains(doc.activeElement)) {
			node = doc.activeElement;
		} else {
			node = state.firstTabbableNode || getNodeForOption('fallbackFocus');
		}

		if (!node) {
			throw new Error("You can't have a focus-trap without at least one focusable element");
		}

		return node;
	};

	// This needs to be done on mousedown and touchstart instead of click
	// so that it precedes the focus event.
	const checkPointerDown = (e) => {
		if (container.contains(e.target)) return;
		if (config.clickOutsideDeactivates) {
			deactivate({
				returnFocus: !tabbable.isFocusable(e.target)
			});
		} else {
			e.preventDefault();
		}
	};

	// In case focus escapes the trap for some strange reason, pull it back in.
	const checkFocusIn = (e) => {
		// In Firefox when you Tab out of an iframe the Document is briefly focused.
		if (container.contains(e.target) || e.target instanceof Document) {
			return;
		}
		e.stopImmediatePropagation();
		tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
	};

	const checkKey = (e) => {
		if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
			e.preventDefault();
			deactivate();
			return;
		}
		if (isTabEvent(e)) {
			checkTab(e);
			return;
		}
	};

	// Hijack Tab events on the first and last focusable nodes of the trap,
	// in order to prevent focus from escaping. If it escapes for even a
	// moment it can end up scrolling the page and causing confusion so we
	// kind of need to capture the action at the keydown phase.
	const checkTab = (e) => {
		updateTabbableNodes();
		if (e.shiftKey && e.target === state.firstTabbableNode) {
			e.preventDefault();
			tryFocus(state.lastTabbableNode);
			return;
		}
		if (!e.shiftKey && e.target === state.lastTabbableNode) {
			e.preventDefault();
			tryFocus(state.firstTabbableNode);
			return;
		}
	};

	const checkClick = (e) => {
		if (config.clickOutsideDeactivates) return;
		if (container.contains(e.target)) return;
		e.preventDefault();
		e.stopImmediatePropagation();
	};

	const updateTabbableNodes = () => {
		const tabbableNodes = tabbable(container);
		state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
		state.lastTabbableNode = tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
	};

	const tryFocus = (node) => {
		if (node === doc.activeElement) return;
		if (!node || !node.focus) {
			tryFocus(getInitialFocusNode());
			return;
		}

		node.focus();
		state.mostRecentlyFocusedNode = node;
		if (isSelectableInput(node)) {
			node.select();
		}
	};

	const trap = {
		activate: activate,
		deactivate: deactivate,
		pause: pause,
		unpause: unpause
	};

	return trap;
};

const isSelectableInput = (node) => {
	return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
};

const isEscapeEvent = (e) => {
	return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
};

const isTabEvent = (e) => {
	return e.key === 'Tab' || e.keyCode === 9;
};

const delay = (fn) => {
	return setTimeout(fn, 0);
};

export default focusTrap;
