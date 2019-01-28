import userIcons from './userIcons';
import fontAwesomeIcons from './fontAwesomeIcons';

const iconList = new Map(null);

const iconsList = [userIcons, fontAwesomeIcons];
for (let icons of iconsList) {
  for (let icon of icons.list) {
    iconList.set(`${icon.name}`, {
      type: icons.type,
      viewBox: icon.viewBox,
      path: icon.path || null,
      tag: icon.tag || null
    });
  }
}

export default iconList;
