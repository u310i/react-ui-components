import { deepMergeOverrideArray } from '.';

type Constants = $Type.DeepPartial<$Type.Constants.All>;

let globalConstants: Constants = {};

export const createAppConstants = (constants: Constants): void => {
  globalConstants = constants;
};

let pageConstants: Constants = {};
export const createPageConstants = (constants: Constants): void => {
  pageConstants = deepMergeOverrideArray(constants, globalConstants);
};

const componentConstants: $Type.Constants.All = {} as $Type.Constants.All;

export const createComponentConstants = <K extends keyof $Type.Constants.All>(
  type: K,
  constants: $Type.Constants.All[K]
): void => {
  if (pageConstants[type]) {
    componentConstants[type] = deepMergeOverrideArray<
      $Type.Constants.All[K],
      Constants[K]
    >(constants, pageConstants[type]);
  } else {
    componentConstants[type] = constants;
  }
};

export const getComponentConstants = <K extends keyof $Type.Constants.All>(
  type: K
): $Type.Constants.All[K] => {
  return componentConstants[type] || {};
};
