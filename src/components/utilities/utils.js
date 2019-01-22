import raf from 'raf';
import * as deepmerge from 'deepmerge';

const deepMerge = (target, source, options) => {
  return deepmerge(target, source, options);
};
deepMerge.overrideArray = (target, source) => {
  return deepMerge(target, source, { arrayMerge: (x, y, options) => y });
};

export { deepMerge };

export const genUniqueId = () => {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

export const isObject = o => {
  return o instanceof Object && !(o instanceof Array);
};

// export const isObject = (item) => {
//   return typeof item === 'object' && item !== null && !Array.isArray(item)
// };

export const createOptimizedEvent = fn => {
  let ticking = false;
  return () => {
    if (!ticking) {
      raf(() => {
        fn();
        ticking = false;
      });
      ticking = true;
    }
  };
};

export const extractOverlapObjectProperty = (first, second, extractIsFirst) => {
  const result = {};
  const extractObj = extractIsFirst ? first : second;
  Object.keys(first).forEach(value => {
    if (second[value]) {
      result[value] = extractObj[value];
    }
  });
  return result;
};

export const toCamelCase = (str, replace = '-') => {
  str = str.charAt(0).toLowerCase() + str.slice(1);
  const reg = new RegExp(`[${replace}](.)`, 'g');
  return str.replace(reg, (match, toUpperStr) => {
    return toUpperStr.toUpperCase();
  });
};

export const fromCamelCase = (camel, insert = '-') => {
  return camel.replace(/[A-Z]/g, s => {
    return insert + s.charAt(0).toLowerCase();
  });
};

export const addProperties = (obj, entries) => {
  for (let [key, value] of entries) {
    obj[key] = value;
  }
};

export const roundNumber = (number, precision) => {
  var shift = function(number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    var numArray = ('' + number).split('e');
    return +(
      numArray[0] +
      'e' +
      (numArray[1] ? +numArray[1] + precision : precision)
    );
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
};
