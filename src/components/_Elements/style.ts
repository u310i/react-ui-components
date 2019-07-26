export default {
	allElementsCommonStyle: {
		boxSizing: 'border-box',
		margin: '0px',
		padding: '0px',
		fontSize: 'inherit'
		// verticalAlign: 'middle'
	},
	ul_ol_style: {
		listStyleType: 'none'
	},
	p_style: {
		lineHeight: '1.5'
	},
	pre_style: {
		whiteSpace: 'pre-wrap'
	},

	// /**
	//  * Add the correct display in IE 10+.
	//  */

	// template {
	//   display: none;
	// }

	// reset.css
	main_style: {
		display: 'block'
	},
	h1_h2_h3_h4_h5_h6_style: {
		fontFamily: 'inherit',
		fontWeight: '500',
		lineHeight: '1.2'
	},
	h1_style: {
		fontSize: '2.5rem'
	},
	h2_style: {
		fontSize: '2rem'
	},
	h3_style: {
		fontSize: '1.75rem'
	},
	h4_style: {
		fontSize: '1.5rem'
	},
	h5_style: {
		fontSize: '1.25rem'
	},
	h6_style: {
		fontSize: '1rem'
	},
	hr_style: {
		height: '1px',
		border: 'none',
		overflow: 'visible'
	},
	pre_code_kbd_samp_style: {
		fontFamily: 'monospace, monospace',
		fontSize: '1em'
	},
	a_style: {
		backgroundColor: 'transparent',
		textDecoration: 'none' //custom
	},
	abbr_style: {
		borderBottom: 'none',
		textDecoration: 'underline',
		textDecoration: 'underline dotted'
	},
	b_strong_style: {
		fontWeight: 'bolder'
	},
	small_style: {
		fontSize: '.8em'
	},
	sub_sup_style: {
		fontSize: '.75em',
		lineHeight: '0',
		position: 'relative',
		verticalAlign: 'baseline'
	},
	sub_style: {
		bottom: '-.25em'
	},
	sup_style: {
		top: '-.5em'
	},
	img_style: {
		borderStyle: 'none',
		verticalAlign: 'bottom',
		display: 'block',
		maxWidth: '100%',
		height: 'auto'
	},
	button_input_optgroup_select_textarea_style: {
		fontFamily: 'inherit',
		fontSize: '1em',
		lineHeight: '1',
		margin: '0px'
	},
	button_inputButton_inputReset_inputSubmit_style: {
		'-webkit-appearance': 'button',
		'&::-moz-focus-inner': {
			borderStyle: 'none',
			padding: '0px'
		},
		'&:-moz-focusring': {
			outline: '1px dotted ButtonText'
		},
		//custom
		cursor: 'pointer',
		outline: 'none',
		lineHeight: '1',
		height: '1.5em'
	},
	button_input_style: {
		overflow: 'visible'
	},
	button_select_style: {
		textTransform: 'none'
	},
	fieldset_style: {
		minWidth: '0px'
	},
	legend_style: {
		color: 'inherit',
		display: 'table',
		maxWidth: '100%',
		padding: '0px',
		whiteSpace: 'normal'
	},
	progress_style: {
		verticalAlign: 'baseline'
	},
	textarea_style: {
		overflow: 'auto'
	},
	details_style: {
		display: 'block'
	},
	summary_style: {
		display: 'list-item'
	},

	// only input
	inputTime_inputDate_inputDatetimeLocal_inputMonth: {
		'-webkit-appearance': 'listbox'
	},
	inputCheckbox_inputRadio_style: {
		padding: '0'
	},
	inputNumber_style: {
		'&::-webkit-inner-spin-button': {
			height: 'auto'
		},
		'&::-webkit-outer-spin-button': {
			height: 'auto'
		}
	},
	inputSearch_style: {
		'-webkit-appearance': 'textfield',
		outlineOffset: '-2px',
		'&::-webkit-search-decoration': {
			'-webkit-appearance': 'none'
		}
	},
	inputFile_style: {
		'&::-webkit-file-upload-button': {
			'-webkit-appearance': 'button',
			font: 'inherit'
		}
	}
};
