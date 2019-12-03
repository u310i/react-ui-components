import userIcons from "./userIcons";
import fontAwesomeIcons from "./fontAwesomeIcons";
import defaultIcons from "./defaultIcons";

declare global {
  namespace $Type {
    namespace Icon {
      type ViewBox = [number, number, number, number];
      type Path = string | string[];

      type BaseIconDefinition = {
        name: string;
        viewBox: ViewBox;
        path?: Path;
        tag?: string;
      };

      type IconDefinition = {
        viewBox: ViewBox;
        path?: Path;
        tag?: string;
      };
    }
  }
}

const iconMap: {
  [key: string]: Map<string, $Type.Icon.IconDefinition>;
} = {};

const libraryList = [defaultIcons, userIcons, fontAwesomeIcons];

for (let library of libraryList) {
  iconMap[library.prefix] = new Map(null);
  for (let icon of library.icons) {
    iconMap[library.prefix].set(icon.name, {
      viewBox: icon.viewBox,
      path: icon.path || undefined,
      tag: icon.tag || undefined
    });
  }
}

export default iconMap;
