import faBrands from './fontAwesome/faFreeBrandsSvgIcons';
import faSoild from './fontAwesome/faFreeSolidSvgIcons';

const list = [];

for (let { icon, prefix, iconName } of [...faBrands, ...faSoild]) {
  list.push({
    name: `${prefix}-${iconName}`,
    viewBox: [0, 0, icon[0], icon[1]],
    path: icon[4]
  });
}
export default { list: list, type: 'fa' };
