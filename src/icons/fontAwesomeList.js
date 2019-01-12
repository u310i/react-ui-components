import { toCamelCase } from 'utilities/utils';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import {
  faBars as fasFaBars,
  faCheckSquare as fasFaCheckSquare,
  faCoffee as fasFaCoffee,
  faAngleDoubleLeft as fasFaAngleDoubleLeft,
  faAngleDoubleRight as fasFaAngleDoubleRight,
  faTimes as fasFaTimes
} from '@fortawesome/free-solid-svg-icons';

const fontAwesomeIconList = [
  faApple,
  fasFaBars,
  fasFaCheckSquare,
  fasFaCoffee,
  fasFaAngleDoubleLeft,
  fasFaAngleDoubleRight,
  fasFaTimes
];

const fontAwesomeIconMap = new Map();
for (let icon of fontAwesomeIconList) {
  const iconName = toCamelCase(icon.iconName, '-');
  fontAwesomeIconMap.set(
    `${icon.prefix}${iconName.charAt(0).toUpperCase() + iconName.slice(1)}`,
    icon
  );
}
export { fontAwesomeIconMap };
export default fontAwesomeIconList;
