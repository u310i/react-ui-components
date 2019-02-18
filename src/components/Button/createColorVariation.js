import { LightenDarkenHex } from 'scripts';

const _hover_selector = '&:hover';
const _focus_selector = '&:focus';
const _active_selector = '&:active';

const _white = '#fff';
const _dark_gray = 'rgb(78, 78, 78)';
const _light_gray = 'rgb(217, 217, 217)';
const _transparent = 'transparent';
const _normal_font_color = 'rgb(89, 89, 89)';

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
  let style = {};
  let nestedStyle = {};

  const ligntenColor = LightenDarkenHex(mainColor, 25);
  const darkenColor = LightenDarkenHex(mainColor, -35);

  if (!disable) {
    const hfStyle = {};
    const aStyle = {};
    switch (type) {
      case 'normal':
        assignColors([
          [style, _normal_font_color, _white, _light_gray],
          [hfStyle, mainColor, null, mainColor],
          [aStyle, darkenColor, null, darkenColor]
        ]);
        break;
      case 'normal-outline':
        assignColors([
          [style, _white, _transparent, _white],
          [hfStyle, mainColor, null, mainColor],
          [aStyle, darkenColor, null, darkenColor]
        ]);
        break;
      case 'dark':
        assignColors([
          [style, _white, _dark_gray, _dark_gray],
          [hfStyle, null, mainColor, mainColor],
          [aStyle, null, darkenColor, darkenColor]
        ]);
        break;
      case 'dark-outline':
        assignColors([
          [style, _dark_gray, _transparent, _dark_gray],
          [hfStyle, mainColor, null, mainColor],
          [aStyle, darkenColor, null, darkenColor]
        ]);
        break;
      case 'outline':
        assignColors([
          [style, mainColor, _transparent, mainColor],
          [hfStyle, ligntenColor, null, ligntenColor],
          [aStyle, darkenColor, null, darkenColor]
        ]);
        break;
      case 'fill':
        assignColors([
          [style, _white, mainColor, mainColor],
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
    nestedStyle = {
      [_hover_selector]: hfStyle,
      [_focus_selector]: hfStyle,
      [_active_selector]: aStyle
    };
  }

  if (disable) {
    style = {
      ...style,
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
    nestedStyle = {
      [_hover_selector]: hoverFocusStyle,
      [_focus_selector]: hoverFocusStyle
    };
    if (
      type === 'outline' ||
      type === 'normal-outline' ||
      type === 'dark-outline'
    ) {
      style = {
        ...style,
        backgroundColor: 'transparent',
        borderColor: 'rgba(0, 0, 0, 0.25)'
      };
      const hoverFocusStyle = {
        backgroundColor: 'transparent'
      };
      nestedStyle = {
        [_hover_selector]: hoverFocusStyle,
        [_focus_selector]: hoverFocusStyle
      };
    }
  }
  return [style, nestedStyle];
};

export default createColorVariation;
