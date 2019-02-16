import { LightenDarkenHex } from 'utilities';

const _hover_selector = '&:hover';
const _focus_selector = '&:focus';
const _active_selector = '&:active';

const _white = '#fff';
const _dark_gray = '#4e4e4e';
const _light_gray = '#d9d9d9';
const _transparent = 'transparent';
const _normal_font_color = '#595959';

const assignColors = list => {
  for (let stage of list) {
    if (stage[0]) {
      if (stage[1]) stage[0].color = stage[1];
      if (stage[2]) stage[0].backgroundColor = stage[2];
      if (stage[3]) stage[0].borderColor = stage[3];
    }
  }
};

const createColorVariation = (mainColor, type, toFill, disable) => {
  let colorStyle = {};
  let nestedColorStyle = {};

  const ligntenColor = LightenDarkenHex(mainColor, 25);
  const darkenColor = LightenDarkenHex(mainColor, -35);

  if (!disable) {
    const hfStyle = {};
    const aStyle = {};
    switch (type) {
      case 'normal':
        assignColors([
          [colorStyle, _normal_font_color, _white, _light_gray],
          [hfStyle, mainColor, null, mainColor],
          [aStyle, darkenColor, null, darkenColor]
        ]);
        break;
      case 'normal-outline':
        assignColors([
          [colorStyle, _white, _transparent, _white],
          [hfStyle, mainColor, null, mainColor],
          [aStyle, darkenColor, null, darkenColor]
        ]);
        break;
      case 'dark':
        assignColors([
          [colorStyle, _white, _dark_gray, _dark_gray],
          [hfStyle, null, mainColor, mainColor],
          [aStyle, null, darkenColor, darkenColor]
        ]);
        break;
      case 'dark-outline':
        assignColors([
          [colorStyle, _dark_gray, _transparent, _dark_gray],
          [hfStyle, mainColor, null, mainColor],
          [aStyle, darkenColor, null, darkenColor]
        ]);
        break;
      case 'outline':
        assignColors([
          [colorStyle, mainColor, _transparent, mainColor],
          [hfStyle, ligntenColor, null, ligntenColor],
          [aStyle, darkenColor, null, darkenColor]
        ]);
        break;
      case 'fill':
        assignColors([
          [colorStyle, _white, mainColor, mainColor],
          [hfStyle, null, ligntenColor, ligntenColor],
          [aStyle, null, darkenColor, darkenColor]
        ]);
      default:
    }
    if (toFill) {
      assignColors([
        [hfStyle, _white, ligntenColor, ligntenColor],
        [aStyle, _white, darkenColor, darkenColor]
      ]);
    }
    nestedColorStyle = {
      [_hover_selector]: hfStyle,
      [_focus_selector]: hfStyle,
      [_active_selector]: aStyle
    };
  }

  if (disable) {
    colorStyle = {
      ...colorStyle,
      color: 'rgba(0, 0, 0, 0.25)',
      backgroundColor: '#f5f5f5',
      borderColor: '#d9d9d9',
      boxShadow: 'none',
      cursor: 'not-allowed'
    };
    const hoverFocusStyle = {
      color: 'rgba(0, 0, 0, 0.25)',
      backgroundColor: '#f5f5f5',
      borderColor: '#d9d9d9'
    };
    nestedColorStyle = {
      [_hover_selector]: hoverFocusStyle,
      [_focus_selector]: hoverFocusStyle
    };
    if (
      type === 'outline' ||
      type === 'normal-outline' ||
      type === 'dark-outline'
    ) {
      colorStyle = {
        ...colorStyle,
        backgroundColor: 'transparent',
        borderColor: 'rgba(0, 0, 0, 0.25)'
      };
      const hoverFocusStyle = {
        backgroundColor: 'transparent'
      };
      nestedColorStyle = {
        [_hover_selector]: hoverFocusStyle,
        [_focus_selector]: hoverFocusStyle
      };
    }
  }
  return [colorStyle, nestedColorStyle];
};

export default createColorVariation;
