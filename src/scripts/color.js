import { isString } from 'scripts';

export const toFullHexa = (() => {
  const hexChar = 'a-f\\d';
  // 3char or 4char: [1]=hex, [2]=alpha | 6char or 8char: [3]=hex, [4]=alpha
  const regExp = new RegExp(
    `^#?([${hexChar}]{3})([${hexChar}]{1})?$|^#?([${hexChar}]{6})([${hexChar}]{2})?$`,
    'i'
  );
  return str => {
    if (!isString(str)) return null;
    let r, g, b, a;
    const matchStr = str.match(regExp);
    if (!matchStr) return;
    if (matchStr[1]) {
      r = matchStr[1][0].repeat(2);
      g = matchStr[1][1].repeat(2);
      b = matchStr[1][2].repeat(2);
      a = matchStr[2] ? matchStr[2].repeat(2) : 'ff';
    } else if (matchStr[3]) {
      r = matchStr[3].substring(0, 2);
      g = matchStr[3].substring(2, 2);
      b = matchStr[3].substring(4, 2);
      a = matchStr[4] || 'ff';
    } else return;
    return r + g + b + a;
  };
})();

export const hexa2rgba = str => {
  const hexa = toFullHexa(str);
  if (!hexa) return;
  const r = parseInt(hexa.substring(0, 2), 16);
  const g = parseInt(hexa.substring(2, 2), 16);
  const b = parseInt(hexa.substring(4, 2), 16);
  const a = Math.round((parseInt(hexa.substring(6, 2), 16) / 255) * 100) / 100;
  return [r, g, b, a];
};

export const rgba2hsla = arr => {
  const r = arr[0] / 255;
  const g = arr[1] / 255;
  const b = arr[2] / 255;

  let cmin = Math.min(r, g, b);
  let cmax = Math.max(r, g, b);
  let delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;

  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l, arr[3]];
};

export const hexa2hsla = str => {
  const hsla = rgba2hsla(hexa2rgba(str));
  return hsla;
};

export const cssRgb2Array = str => {
  const rgb = '\\s*([0-9]{1,3})\\s*';
  const percent = '[1-9]?[0-9]%|100%';
  const float = '0?.[0-9]{0,2}[1-9]|1|0';
  const regExp = new RegExp(
    `^(rgba?)\\(${rgb},${rgb},${rgb},?\\s*(?:(${percent})|(${float}))?\\s*\\)$`,
    'i'
  );
  const match = str.match(regExp);

  if (match) {
    let r, g, b;
    let alpha;
    if (match[2] && match[3] && match[4]) {
      r = parseInt(match[2], 10);
      g = parseInt(match[3], 10);
      b = parseInt(match[4], 10);
    }
    if (match[5] || match[6]) {
      if (match[5]) {
        alpha = match[5].substring(0, match[5].length - 1) / 100;
      }
      if (match[6]) {
        if (match[6][0] === '.') {
          alpha = Number(`0${match[6]}`);
        } else {
          alpha = Number(match[6]);
        }
      }
    } else {
      alpha = 1;
    }

    return [r, g, b, alpha];
  }
};

export const toCssColor = (arr, type) => {
  if (type === 'hsla') {
    return `hsla(${arr[0]}, ${arr[1]}%, ${arr[2]}%, ${arr[3]})`;
  }
  if (type === 'rgba') {
    return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]})`;
  }
};

export const LightenDarkenHex = (str, amt = 0) => {
  const hexa = toFullHexa(str);
  if (!hexa) return;
  let num = parseInt(hexa.substring(0, 6), 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let g = ((num >> 8) & 0x00ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  let b = (num & 0x0000ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  return (
    '#' +
    ('000000' + (b | (g << 8) | (r << 16)).toString(16)).slice(-6) +
    hexa.substring(6, 2)
  );
};

export const adustBrightness = (array, amt = 0) => {
  const addition = (v, amt) => {
    let result = v + amt;
    if (result > 255) result = 255;
    else if (result < 0) result = 0;
    return result;
  };

  const r = addition(array[0], amt);
  const g = addition(array[1], amt);
  const b = addition(array[2], amt);

  return [r, g, b, array[3]];
};

export const adustBrightnessFromCssRgb = (cssRgb, amt) => {
  return toCssColor(adustBrightness(cssRgb2Array(cssRgb), amt), 'rgba');
};
