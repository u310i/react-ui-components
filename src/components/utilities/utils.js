import raf from 'raf';
import * as deepmerge from 'deepmerge';

export const genUniqueId = () => {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

export const isObject = o => {
  return o instanceof Object && !(o instanceof Array);
};

export const genReactCSSTransitionStyle = (name, fn) => {
  const {
    defaultStyle,
    appear,
    appearActive,
    enter,
    enterActive,
    enterDone,
    exit,
    exitActive,
    exitDone
  } = fn();

  return {
    ...(defaultStyle || {}),
    [`&.${name}-appear`]: appear || enter,
    [`&.${name}-appear-active`]: appearActive || enterActive,
    [`&.${name}-enter`]: enter,
    [`&.${name}-enter-active`]: enterActive,
    [`&.${name}-enter-done`]: enterDone || exit,
    [`&.${name}-exit`]: exit,
    [`&.${name}-exit-active`]: exitActive,
    [`&.${name}-exit-done`]: exitDone || enter
  };
};

// export const createReactCSSTransitionCallBack = (name, node) => {
//   return {
//     onEnter: () => {
//       node.classList.remove(`${name}-exit`);
//       node.classList.remove(`${name}-exit-active`);
//       node.classList.add(`${name}-enter`);
//     },
//     onEntering: () => {
//       node.classList.add(`${name}-enter-active`);
//     },
//     onEntered: () => {
//       node.classList.remove(`${name}-enter`);
//       node.classList.remove(`${name}-enter-active`);
//       node.classList.add(`${name}-enter-done`);
//     },
//     onExit: () => {
//       node.classList.remove(`${name}-enter`);
//       node.classList.remove(`${name}-enter-active`);
//       node.classList.remove(`${name}-enter-done`);
//       node.classList.add(`${name}-exit`);
//     },
//     onExiting: () => {
//       node.classList.add(`${name}-exit-active`);
//     },
//     onExited: () => {
//       node.classList.remove(`${name}-exit`);
//       node.classList.remove(`${name}-exit-active`);
//     }
//   };
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

export const createGetScrollUpDownState = initRow => {
  let currentRow,
    prevRow,
    state = 'equal',
    isFirstRender = true;
  return row => {
    if (isFirstRender) {
      prevRow = initRow;
      isFirstRender = false;
    } else {
      prevRow = currentRow;
    }
    currentRow = row;
    if (currentRow > prevRow) {
      if (state !== 'down') {
        state = 'down';
      }
    } else if (currentRow < prevRow) {
      if (state !== 'up') {
        state = 'up';
      }
    } else {
      if (state !== 'equal') {
        state = 'equal';
      }
    }

    return state;
  };
};

const deepMergeOverrideArray = (target, source) => {
  return deepmerge(target, source, { arrayMerge: (x, y, options) => y });
};

export const extractCurrentScreenSizeProps = (state, options) => {
  const { xs, sm, md, lg, xl, ...common } = options;
  const max = xl || lg || md || sm || xs;
  const currentOptions = (state === 'xs' && { ...common, ...xs }) ||
    (state === 'sm' && deepMergeOverrideArray(common, sm)) ||
    (state === 'md' && deepMergeOverrideArray(common, md)) ||
    (state === 'lg' && deepMergeOverrideArray(common, lg)) ||
    (state === 'xl' && deepMergeOverrideArray(common, xl)) ||
    (state === 'max' && deepMergeOverrideArray(common, max)) || { ...common };
  return currentOptions;
};

export const extractOverlapObjectProperty = (
  first,
  second,
  extractFromFirst
) => {
  const result = {};
  const extractObj = extractFromFirst ? first : second;
  Object.keys(first).forEach(value => {
    if (second[value]) {
      result[value] = extractObj[value];
    }
  });
  return result;
};

export const camelCaceToAny = (camel, insert = '_') => {
  return camel.replace(/([A-Z])/g, s => {
    return insert + s.charAt(0).toLowerCase();
  });
};

export const makeTransitionalProperty = style => {
  return Object.keys(style)
    .map(value => {
      return camelCaceToAny(value, '-');
    })
    .join();
};
