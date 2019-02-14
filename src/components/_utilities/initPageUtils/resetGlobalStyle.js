export default {
  ':root': {
    fontFamily: 'sans-serif',
    lineHeight: '1',
    'line-sizing': 'normal',
    textSpacing:
      'trim-start allow-end trim-adjacent ideograph-alpha ideograph-numeric',
    '-webkit-text-size-adjust': '100%',
    '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)'
  },
  body: {
    margin: '0',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    fontSize: '1rem',
    fontWeight: '400',
    color: '#212529',
    textAlign: 'left',
    backgroundColor: '#fff'
  },
  '[tabindex="-1"]:focus': {
    outline: '0 !important'
  },
  div: {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0
  },
  template: {
    display: 'none'
  },
  '[hidden]': {
    display: 'none !important'
  },
  svg: {
    overflow: 'hidden',
    verticalAlign: 'middle'
  }
};
