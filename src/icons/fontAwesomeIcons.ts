import faBrands from "./fontAwesome/faFreeBrandsSvgIcons";
import faSoild from "./fontAwesome/faFreeSolidSvgIcons";
import { IconDefinition as fontAwesomeIconDefinition } from "@fortawesome/fontawesome-common-types";

const prefix = "fa";

export const convertFaIcons = (
  iconList: fontAwesomeIconDefinition[]
): $Type.Icon.BaseIconDefinition[] => {
  const icons = [];
  for (let { icon, prefix: faPrefix, iconName } of iconList) {
    icons.push({
      name: `${faPrefix}-${iconName}`,
      viewBox: [0, 0, icon[0], icon[1]] as $Type.Icon.ViewBox,
      path: icon[4] as string
    });
  }
  return icons;
};

const icons = convertFaIcons([...faBrands, ...faSoild]);

export default { icons, prefix };
