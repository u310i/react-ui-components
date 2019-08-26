import { addEventListener, testPassiveEventSupport } from './addEventListener';
import { raf, isNumber } from '.';

export { addEventListener, testPassiveEventSupport };

export const reflow = (node: Element) => node.scrollTop;

export const getFontSize = (data: number | string) => {
  if (isNumber(data)) return `${Math.round(data * 100) / 100}px`;
  if (typeof data !== 'string') return '1em';
  switch (data) {
    case 'xs':
      return '.75em';
    case 'sm':
      return '.875em';
    case 'lg':
      return '1.33333em';
    default:
      const match = data.match(/^([2-9]|10)x$/);
      if (match) {
        return `${match[1]}em`;
      }
      return data;
  }
};

type GenDurations = {
  enter: number;
  exit: number;
  appear: number;
};

export const genDurations = (
  duration: $Type.Transition.Duration
): GenDurations => {
  if (!duration)
    return {
      enter: 0,
      exit: 0,
      appear: 0,
    };
  if ('number' === typeof duration) {
    return {
      enter: duration,
      exit: duration,
      appear: duration,
    };
  } else {
    return {
      enter: duration.enter,
      exit: duration.exit || duration.enter,
      appear: duration.appear || duration.enter,
    };
  }
};

type GenEasings = {
  enter: string;
  exit: string;
  appear: string;
};
export const genEasings = (easing: $Type.Transition.Easing): GenEasings => {
  if (!easing)
    return {
      enter: 'linear',
      exit: 'linear',
      appear: 'linear',
    };
  if ('string' === typeof easing) {
    return {
      enter: easing,
      exit: easing,
      appear: easing,
    };
  } else {
    return {
      enter: easing.enter,
      exit: easing.exit || easing.enter,
      appear: easing.appear || easing.enter,
    };
  }
};

export const setTransition = (node: HTMLElement, value: string | null) => {
  const property = value === null ? 'null' : value;
  node.style.webkitTransition = property;
  node.style.transition = property;
};

export const setTransform = (node: HTMLElement, value: string) => {
  node.style.webkitTransform = value;
  node.style.transform = value;
};

type GenTransitionPropertyParam = {
  property?: string;
  duration?: number;
  easing?: string;
  delay?: number;
}[];

export const genTransitionProperty = (
  propsList: GenTransitionPropertyParam
): string => {
  let transitionProp = [];
  for (let props of propsList) {
    transitionProp.push(
      [
        props.property || 'all',
        props.duration || props.duration === 0 ? `${props.duration}ms` : '0ms',
        props.easing || 'linear',
        props.delay || props.delay === 0 ? `${props.delay}ms` : 'all',
      ].join(' ')
    );
  }
  return transitionProp.join(', ');
};

export const genUniqueId = () => {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

export const createOptimizedEvent = (
  fn: (arg: any) => void,
  clearRef: { clear: null | (() => void) }
) => {
  let ticking = false;
  let handle: number;
  return (arg: any): void => {
    if (!ticking) {
      handle = raf(() => {
        clearRef.clear = null;
        ticking = false;
        fn(arg);
      });
      clearRef.clear = () => raf.cancel(handle);
      ticking = true;
    }
  };
};

// export const extractOverlapObjectProperty = (first, second, extractIsFirst) => {
// 	const result = {};
// 	const extractObj = extractIsFirst ? first : second;
// 	Object.keys(first).forEach((value) => {
// 		if (second[value]) {
// 			result[value] = extractObj[value];
// 		}
// 	});
// 	return result;
// };

export const toCamelCase = (str: string, replace = '-') => {
  str = str.charAt(0).toLowerCase() + str.slice(1);
  const reg = new RegExp(`[${replace}](.)`, 'g');
  return str.replace(reg, (match, toUpperStr) => {
    return toUpperStr.toUpperCase();
  });
};

export const fromCamelCase = (camel: string, insert = '-') => {
  return camel.replace(/[A-Z]/g, s => {
    return insert + s.charAt(0).toLowerCase();
  });
};

export const roundNumber = (number: number, precision = 0) => {
  const shift = (number: number, precision: number, reverseShift: boolean) => {
    if (reverseShift) {
      precision = -precision;
    }
    const numArray = ('' + number).split('e');
    return +(
      numArray[0] +
      'e' +
      (numArray[1] ? +numArray[1] + precision : precision)
    );
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
};

export const ownerDocument = <T extends Element>(node: T) => {
  return (node && node.ownerDocument) || document;
};

export const ownerWindow = <T extends Element>(node: T, fallback = window) => {
  const doc = ownerDocument(node) as any;
  return doc.defaultView || doc.parentView || fallback;
};

export const clickedScrollbar = (event: MouseEvent) => {
  if (!event.clientX || !event.clientY) return;
  return (
    document.documentElement.clientWidth <= event.clientX ||
    document.documentElement.clientHeight <= event.clientY
  );
};

export const getTransitionEndName = (() => {
  const transitions = {
    transition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
  } as const;

  type Transitions = typeof transitions;
  type Keys = keyof Transitions;

  const testElementStyle = document.body.style as {
    [key: string]: any;
  };
  let transitionEndName: Transitions[Keys];
  for (let t of Object.keys(transitions) as Keys[]) {
    if (typeof testElementStyle[t] !== 'undefined') {
      transitionEndName = transitions[t];
      break;
    }
  }
  return () => transitionEndName;
})();

export const extractElement = (
  value: $Type.IncludeElement
): $Type.MaybeElement => {
  if (!value) {
    return null;
  }
  const node: $Type.MaybeElement =
    typeof value === 'string'
      ? document.querySelector(value)
      : typeof value === 'function'
      ? value()
      : 'current' in (value as any)
      ? (value as { current: $Type.MaybeElement }).current
      : (value as $Type.MaybeElement);

  return node;
};

export const injectElementToRef = (
  ref: $Type.Ref | undefined,
  element: $Type.MaybeElement
) => {
  if (ref) {
    typeof ref === 'function' ? ref(element) : (ref.current = element);
  }
};
