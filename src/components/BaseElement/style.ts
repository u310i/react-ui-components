export const common = {
  boxSizing: 'border-box',
  margin: '0px',
  padding: '0px',
  fontSize: 'inherit',
  // verticalAlign: 'middle'
} as const;

export default {
  ul_ol: {
    listStyleType: 'none',
  },
  p: {
    lineHeight: '1.5',
  },
  pre: {
    whiteSpace: 'pre-wrap',
  },

  // /**
  //  * Add the correct display in IE 10+.
  //  */

  // template {
  //   display: none;
  // }

  // reset.css
  main: {
    display: 'block',
  },
  h1_h2_h3_h4_h5_h6: {
    fontFamily: 'inherit',
    fontWeight: '500',
    lineHeight: '1.2',
  },
  h1: {
    fontSize: '2.5rem',
  },
  h2: {
    fontSize: '2rem',
  },
  h3: {
    fontSize: '1.75rem',
  },
  h4: {
    fontSize: '1.5rem',
  },
  h5: {
    fontSize: '1.25rem',
  },
  h6: {
    fontSize: '1rem',
  },
  hr: {
    height: '1px',
    border: 'none',
    overflow: 'visible',
  },
  pre_code_kbd_samp: {
    fontFamily: 'monospace, monospace',
    fontSize: '1em',
  },
  a: {
    backgroundColor: 'transparent',
    textDecoration: 'none', //custom
  },
  abbr: {
    borderBottom: 'none',
    textDecoration: 'underline',
  },
  strong: {
    fontWeight: 'bolder',
  },
  small: {
    fontSize: '.8em',
  },
  sub_sup: {
    fontSize: '.75em',
    lineHeight: '0',
    position: 'relative',
    verticalAlign: 'baseline',
  },
  sub: {
    bottom: '-.25em',
  },
  sup: {
    top: '-.5em',
  },
  img: {
    borderStyle: 'none',
    verticalAlign: 'bottom',
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
  },
  button_input_optgroup_select_textarea: {
    fontFamily: 'inherit',
    fontSize: '1em',
    lineHeight: '1',
    margin: '0px',
  },
  button_inputButton_inputReset_inputSubmit: {
    '-webkit-appearance': 'button',
    '&::-moz-focus-inner': {
      borderStyle: 'none',
      padding: '0px',
    },
    '&:-moz-focusring': {
      outline: '1px dotted ButtonText',
    },
    //custom
    cursor: 'pointer',
    outline: 'none',
    lineHeight: '1',
    height: '1.5em',
  },
  button_input: {
    overflow: 'visible',
  },
  button_select: {
    textTransform: 'none',
  },
  fieldset: {
    minWidth: '0px',
  },
  legend: {
    color: 'inherit',
    display: 'table',
    maxWidth: '100%',
    padding: '0px',
    whiteSpace: 'normal',
  },
  progress: {
    verticalAlign: 'baseline',
  },
  textarea: {
    overflow: 'auto',
  },
  details: {
    display: 'block',
  },
  summary: {
    display: 'list-item',
  },

  // only input
  inputTime_inputDate_inputDatetimeLocal_inputMonth: {
    '-webkit-appearance': 'listbox',
  },
  inputCheckbox_inputRadio: {
    padding: '0',
  },
  inputNumber: {
    '&::-webkit-inner-spin-button': {
      height: 'auto',
    },
    '&::-webkit-outer-spin-button': {
      height: 'auto',
    },
  },
  inputSearch: {
    '-webkit-appearance': 'textfield',
    outlineOffset: '-2px',
    '&::-webkit-search-decoration': {
      '-webkit-appearance': 'none',
    },
  },
  inputFile: {
    '&::-webkit-file-upload-button': {
      '-webkit-appearance': 'button',
      font: 'inherit',
    },
  },
} as const;
