import { getComponentMaterials, adustBrightnessFromCssRgb } from 'scripts';

const materials = getComponentMaterials('button');
const styles = materials.styles;

const selectors = materials.origin.selectors;

const getColor = (type, keyColor) => {
  let style = {};

  let activeColor;
  let hoverColor;
  if (keyColor) {
    activeColor = adustBrightnessFromCssRgb(keyColor, -35);
    hoverColor = adustBrightnessFromCssRgb(keyColor, 25);
  }

  switch (type) {
    case 'normal-outline':
      style = styles.types.normalOutline;
      if (keyColor) {
        style[selectors.hover_focus].color = keyColor;
        style[selectors.hover_focus].borderColor = keyColor;
        style[selectors.active].color = activeColor;
        style[selectors.active].borderColor = activeColor;
      }
      return style;
    case 'dark':
      style = styles.types.dark;
      if (keyColor) {
        style[selectors.hover_focus].backgroundColor = keyColor;
        style[selectors.hover_focus].borderColor = keyColor;
        style[selectors.active].backgroundColor = activeColor;
        style[selectors.active].borderColor = activeColor;
      }
      return style;
    case 'dark-outline':
      style = styles.types.darkOutline;
      if (keyColor) {
        style[selectors.hover_focus].color = keyColor;
        style[selectors.hover_focus].borderColor = keyColor;
        style[selectors.active].color = activeColor;
        style[selectors.active].borderColor = activeColor;
      }
      return style;
    case 'outline':
      style = styles.types.outline;
      if (keyColor) {
        style.color = keyColor;
        style.borderColor = keyColor;
        style[selectors.hover_focus].color = hoverColor;
        style[selectors.hover_focus].borderColor = hoverColor;
        style[selectors.active].color = activeColor;
        style[selectors.active].borderColor = activeColor;
      }
      return style;
    case 'fill':
      style = styles.types.fill;
      if (keyColor) {
        style.backgroundColor = keyColor;
        style.borderColor = keyColor;
        style[selectors.hover_focus].backgroundColor = hoverColor;
        style[selectors.hover_focus].borderColor = hoverColor;
        style[selectors.active].backgroundColor = activeColor;
        style[selectors.active].borderColor = activeColor;
      }
      return style;
    case 'normal':
    default:
      style = styles.types.normal;
      if (keyColor) {
        style[selectors.hover_focus].color = keyColor;
        style[selectors.hover_focus].borderColor = keyColor;
        style[selectors.active].color = activeColor;
        style[selectors.active].borderColor = activeColor;
      }
      return style;
  }
};

export default (type, toFill, disable, keyColor) => {
  let style = {};

  if (!disable) {
    style = getColor(type, keyColor);
    if (toFill) {
      style = {
        ...style,
        ...styles.toFill
      };
    }
  }

  if (disable) {
    if (
      type === 'outline' ||
      type === 'normal-outline' ||
      type === 'dark-outline'
    ) {
      style = styles.outlineDisable;
    } else {
      style = styles.disable;
    }
  }

  return style;
};
