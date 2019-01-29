import { roundNumber } from 'utilities/utils';
import { testCssNumberRegExp } from 'utilities/regExp';
import iconList from 'src/icons';

export const getFontSize = size => {
  // console.log(size);
  switch (size) {
    case 'xs':
      return '.75em';
    case 'sm':
      return '.875em';
    case 'lg':
      return '1.33333em';
    default:
      let match;
      match = size.match(/^([2-9]|10)x$/);
      if (match) {
        return `${match[1]}em`;
      }
      match = size.match(testCssNumberRegExp);
      if (match) {
        if (match[3] || match[5]) {
          return match[0];
        } else {
          return `${match[0]}em`;
        }
      }
      return '1em';
  }
};

export const getIcon = name => {
  const icon = iconList.get(name);
  const w = icon.viewBox[2];
  const h = icon.viewBox[3];
  const ratio = roundNumber(w / h, 3);
  return {
    ...icon,
    ratio: ratio
  };
};
