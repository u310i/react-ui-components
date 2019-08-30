import faBrands from './fontAwesome/faFreeBrandsSvgIcons';
import faSoild from './fontAwesome/faFreeSolidSvgIcons';
import { IconDefinition as fontAwesomeIconDefinition } from '@fortawesome/fontawesome-common-types';

export const convertFaIcons = (
  iconList: fontAwesomeIconDefinition[]
): $Type.Icon.BaseIconDefinition[] => {
  const list = [];
  for (let { icon, prefix, iconName } of iconList) {
    list.push({
      name: `${prefix}-${iconName}`,
      viewBox: [0, 0, icon[0], icon[1]] as $Type.Icon.ViewBox,
      path: icon[4] as string,
    });
  }
  return list;
};

const list = convertFaIcons([...faBrands, ...faSoild]);

export default { list: list, type: 'fa' };
