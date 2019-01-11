import { userDefinedIconList } from 'src/icons/userDefinedIconList';

export const getUserDefinedIconData = name => {
  let iconData;
  for (let value of userDefinedIconList) {
    if (name === value.name) {
      iconData = value;
      break;
    }
  }
  return iconData;
};
