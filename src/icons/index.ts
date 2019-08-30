import userIcons from './userIcons';
import fontAwesomeIcons from './fontAwesomeIcons';
import defaultIcons from './defaultIcons';

declare global {
  namespace $Type {
    namespace Icon {
      type ViewBox = [number, number, number, number];
      type Path = string | string[];

      type BaseIconDefinition = {
        name: string | string[];
        viewBox: ViewBox;
        path?: Path;
        tag?: string;
      };

      type IconDefinition = {
        type: string;
        viewBox: ViewBox;
        path?: Path;
        tag?: string;
      };
    }
  }
}

const iconList: Map<string, $Type.Icon.IconDefinition> = new Map(null);

const iconPackageList = [defaultIcons, userIcons, fontAwesomeIcons];

for (let icons of iconPackageList) {
  for (let icon of icons.list) {
    iconList.set(`${icon.name}`, {
      type: icons.type,
      viewBox: icon.viewBox,
      path: icon.path || undefined,
      tag: icon.tag || undefined,
    });
  }
}

export default iconList;
