// import React from 'react';

export const isReactComponentChildren = <P = any>(
  children: React.ReactNode
): children is React.ReactElement<P, React.JSXElementConstructor<P>> => {
  return !!children && typeof children === 'object' && !Array.isArray(children)
    && !('children' in children) && 'type' in children && 'props' in children
};


export const isTransitionComponent = (
  children: React.ReactElement<any>
): children is React.ReactElement<$Type.Transition.PropTransitionComponentCommonProps> => {
  return !!children && !!children.props && children.props.hasOwnProperty('in');
};
// export const isArray = (data) => {
// 	return Array.isArray(data);
// };

// export const isEmptyArray = (data) => {
// 	return isArray(data) && data.length === 0;
// };

export const isObject = (data: any) => {
  return Object.prototype.toString.call(data) === '[object Object]';
};

// export const isEmptyObject = (data) => {
// 	return isObject(data) && Object.keys(data).length === 0;
// };

const posinf = Number.POSITIVE_INFINITY;
const neginf = Number.NEGATIVE_INFINITY;

export const isNumber = (data: any): data is number => {
  return typeof data === 'number' && data > neginf && data < posinf;
};

// export const isNaN = (data) => {
// 	return Number.isNaN(data);
// };

export const isInteger = (data: any): boolean => {
  return typeof data === 'number' && data % 1 === 0;
};

export const isEven = (data: any): boolean => {
  return typeof data === 'number' && data % 2 === 0;
};

export const isOdd = (data: any): boolean => {
  return isInteger(data) && data % 2 !== 0;
};

// export const isString = (data) => {
// 	return typeof data === 'string';
// };

// export const isEmptyString = (data) => {
// 	return isString(data) && data === '';
// };

// export const isBoolean = (data) => {
// 	return data === false || data === true;
// };

// export const isFunction = (data) => {
// 	return typeof data === 'function';
// };

const instanceStrict = (data: any, prototype: any): boolean => {
  try {
    return data instanceof prototype;
  } catch (error) {
    return false;
  }
};

export const isDate = (data: any): data is Date => {
  return instanceStrict(data, Date) && isInteger(data.getTime());
};

// export const isReact = (data) => {
// 	return React.isValidElement(data);
// };

// export const isReactComponent = (data) => {
// 	return isReact(data) && isFunction(data.type);
// };

// export const isReactElement = (data) => {
// 	return isReact(data) && isString(data.type);
// };

// export const isUndefined = (data) => {
// 	return typeof data === 'undefined';
// };

// export const getType = (data) => {
// 	if (isNaN(data)) {
// 		return 'NaN';
// 	}
// 	if (isReact(data)) {
// 		if (isReactComponent(data)) {
// 			return 'reactComponent';
// 		}
// 		if (isReactElement) {
// 			return 'reactElement';
// 		}
// 	}
// 	return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
// };
