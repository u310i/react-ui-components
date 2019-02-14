import userIcons from './userIcons';
import fontAwesomeIcons from './fontAwesomeIcons';
import defaultIcons from './defaultIcons';

const iconList = new Map(null);

const iconPackageList = [defaultIcons, userIcons, fontAwesomeIcons];
for (let icons of iconPackageList) {
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
