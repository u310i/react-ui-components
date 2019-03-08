import React from 'react';

export const isArray = data => {
  return Array.isArray(data);
};

export const isEmptyArray = data => {
  return isArray(data) && data.length === 0;
};

export const isObject = data => {
  return Object.prototype.toString.call(data) === '[object Object]';
};

export const isEmptyObject = data => {
  return isObject(data) && Object.keys(data).length === 0;
};

const posinf = Number.POSITIVE_INFINITY;
const neginf = Number.NEGATIVE_INFINITY;

export const isNumber = data => {
  return typeof data === 'number' && data > neginf && data < posinf;
};

export const isNaN = data => {
  return Number.isNaN(data);
};

export const isInteger = data => {
  return typeof data === 'number' && data % 1 === 0;
};

export const isEven = data => {
  return typeof data === 'number' && data % 2 === 0;
};

export const isOdd = data => {
  return integer(data) && data % 2 !== 0;
};

export const isString = data => {
  return typeof data === 'string';
};

export const isEmptyString = data => {
  return isString(data) && data === '';
};

export const isBoolean = data => {
  return data === false || data === true;
};

export const isFunction = data => {
  return typeof data === 'function';
};

export const isDate = data => {
  return instanceStrict(data, Date) && integer(data.getTime());
};

export const isReact = data => {
  return React.isValidElement(data);
};

export const isReactComponent = data => {
  return isReact(data) && isFunction(data.type);
};

export const isReactElement = data => {
  return isReact(data) && isString(data.type);
};

export const isUndefined = data => {
  return data === undefined;
};

export const getType = data => {
  if (isNaN(data)) {
    return 'NaN';
  }
  if (isReact(data)) {
    if (isReactComponent(data)) {
      return 'reactComponent';
    }
    if (isReactElement) {
      return 'reactElement';
    }
  }
  return Object.prototype.toString
    .call(data)
    .slice(8, -1)
    .toLowerCase();
};
