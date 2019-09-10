/* eslint-disable */

const React = require('react');

const posinf = Number.POSITIVE_INFINITY;
const neginf = Number.NEGATIVE_INFINITY;

const isNumber = data => {
  return typeof data === 'number' && data > neginf && data < posinf;
};

const isMergeableObject = value => {
  return isNonNullObject(value) && !isSpecial(value);
};

const isNonNullObject = value => {
  return !!value && typeof value === 'object';
};

const isSpecial = value => {
  const stringValue = Object.prototype.toString.call(value);

  return (
    stringValue === '[object Array]' ||
    stringValue === '[object RegExp]' ||
    stringValue === '[object Date]' ||
    React.isValidElement(value)
  );
};

const isOverrideObject = value => {
  return (
    typeof Value === 'string' ||
    isNumber(value) ||
    value === false ||
    value === true
  );
};

const override = (target, source) => {
  const destination = {};
  Object.keys(target).forEach(key => {
    destination[key] = source[key]
      ? isMergeableObject(target[key])
        ? override(target[key], source[key])
        : Object.prototype.toString.call(target[key]) ===
          Object.prototype.toString.call(source[key])
        ? source[key]
        : target[key]
      : target[key];
  });

  return destination;
};

const overrideConstants = (target, source) => {
  if (!target || !source) return {};
  return override(target, source);
};

const target = {
  a: {
    a_1: 'a_1_',
  },
  b: 'b_',
  c: {
    c_1: 'c_1_',
    c_2: 'c_2_',
    c_3: {
      c_3_1: 'c_3_1_',
      c_3_2: ['foo', 'bar', 'baz', 'foobaz'],
    },
  },
  d: 'd_',
};

const source = {
  a: 'aa_',
  b: {
    b_1: 'bb_1_',
  },
  c: {
    c_2: {
      c_2_1: 'c_2_1_',
    },
    c_3: {
      c_3_1: ['aaa', 'bbb'],
      c_3_2: ['123', 'true'],
    },
  },
  d: ['123', 234],
  e: {
    e_1: 'ee_1_',
  },
};

// console.log(overrideConstants(target, source));
console.log(JSON.stringify(overrideConstants(target, source), null, '  '));
