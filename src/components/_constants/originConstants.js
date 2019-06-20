import shadow from './shadow';

const colors = {
	white: '#fff',
	main: 'rgb(24, 144, 255)',
	transparent: 'transparent'
};

const appear = '&.appear';
const appearing = '&.appear-active';
const enter = '&.enter';
const entering = '&.enter-active';
const entered = '&.enter-done';
const exit = '&.exit';
const exiting = '&.exit-active';
const exited = '&.exit-done';

const selectors = {
	hover: '&:hover',
	focus: '&:focus',
	active: '&:active',
	hover_focus: '&:hover,&:focus',
	nested: {
		child: '& > *',
		firstChild: '& > :first-child',
		lastChild: '& > :last-child',
		notFirstChild: '& > :not(:first-child)',
		notLastChild: '& > :not(:last-child)',
		nthChild: (n) => `& > :nth-child(${n})`,
		notNthChild: (n) => `& > :not(:nth-child(${n}))`
	},
	transition: {
		appear: appear,
		appearing: appearing,
		enter: enter,
		entering: entering,
		entered: entered,
		exit: exit,
		exiting: exiting,
		exited: exited,
		enters: `${appear},${enter}`,
		enterings: `${appearing},${entering}`
	}
};

const cubicBeziers = {
	easeBaseOut: 'cubic-bezier(0.7, 0.3, 0.1, 1)',
	easeBaseIn: 'cubic-bezier(0.9, 0, 0.3, 0.7)',
	easeOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
	easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
	easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
	easeOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
	easeInBack: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
	easeInOutBack: 'cubic-bezier(0.71, -0.46, 0.29, 1.46)',
	easeOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
	easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.34)',
	easeInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
	easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
	easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
	easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
	easeInOutEndSlowly: 'cubic-bezier(0.4, 0, 0.2, 1)'
};

const zIndex = {
	button: 100,
	slide: 200,
	backdrop: 1000,
	appBar: 1100,
	drawer: 1200,
	modal: 1300,
	snackbar: 1400,
	tooltip: 1500
};

const shape = {
	corner: '0',
	default: '0.25em',
	round: '1em',
	circle: '50%'
};

const props = {
	transitionDuration: { enter: 300, exit: 300 },
	transitionEasing: {
		enter: cubicBeziers.easeInOutEndSlowly,
		exit: cubicBeziers.easeInOutEndSlowly
	}
};

export default {
	colors,
	selectors,
	cubicBeziers,
	zIndex,
	shape,
	shadow,
	props
};
