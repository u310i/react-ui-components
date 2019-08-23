import { deepMergeOverrideArray } from '..';

type Constants = {
  [key: string]: any;
};

let globalConstants: Constants;

export const createAppConstants = (constants: Constants) => {
  globalConstants = constants;
};

let pageConstants: Constants;
export const createPageConstants = (constants: Constants) => {
  pageConstants = deepMergeOverrideArray(constants, globalConstants);
};

const componentConstants: Constants = {};

export const createComponentConstants = (
  constants: Constants,
  type: string
) => {
  if (pageConstants[type]) {
    componentConstants[type] = deepMergeOverrideArray(
      constants,
      pageConstants[type]
    );
  } else {
    componentConstants[type] = constants;
  }
};

export const getComponentConstants = (type: string) => {
  return componentConstants[type] || {};
};
