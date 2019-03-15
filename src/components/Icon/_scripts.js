import { roundNumber } from 'scripts';
import iconList from 'src/icons';

const getIcon = name => {
  const icon = iconList.get(name);
  if (!icon) return null;
  const w = icon.viewBox[2];
  const h = icon.viewBox[3];
  const ratio = roundNumber(w / h, 3);
  return {
    ...icon,
    ratio: ratio
  };
};

export default {
  getIcon: getIcon
};