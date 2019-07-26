import faBrands from './fontAwesome/faFreeBrandsSvgIcons';
import faSoild from './fontAwesome/faFreeSolidSvgIcons';

export const convertFaIcons = iconList => {
  const list = [];
  for (let { icon, prefix, iconName } of iconList) {
    list.push({
      name: `${prefix}-${iconName}`,
      viewBox: [0, 0, icon[0], icon[1]],
      path: icon[4]
    });
  }
  return list;
};

const list = convertFaIcons([...faBrands, ...faSoild]);

export default { list: list, type: 'fa' };
