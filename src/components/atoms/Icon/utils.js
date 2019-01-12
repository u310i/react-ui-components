export const getFontSize = size => {
  let fontSize;
  switch (size) {
    case 'xs':
      fontSize = '.75em';
    case 'sm':
      fontSize = '.875em';
    case 'lg':
      fontSize = '1.33333em';
    default:
  }
  const reg = new RegExp(/^([2-9]|10)x$/);
  fontSize = `${size.match(reg)[1]}em`;
  return fontSize;
};
