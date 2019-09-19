import { overrideConstant, mergeConstant } from './constantUtils'

type Constants = $Type.DeepWiden<$Type.DeepPartial<$Type.Constants.All>>;

let globalConstants: Constants = {};

export const createAppConstants = (constants: Constants): void => {
  globalConstants = constants;
};


let pageConstants: Constants = {};
export const createPageConstants = (constants: Constants): void => {
  pageConstants = mergeConstant(constants, globalConstants);
};

const componentConstants: $Type.DeepPartial<$Type.DeepMutable<$Type.Constants.All>> = {}

export const createComponentConstants = <K extends keyof $Type.Constants.All>(
  type: K,
  constants: $Type.Constants.All[K]
): void => {
  componentConstants[type] = (pageConstants[type] ? (overrideConstant(constants, pageConstants[type]) || {}) : constants) as any
};

export const getComponentConstants = <K extends keyof $Type.Constants.All, T = $Type.Constants.All[K]>(
  type: K
): any => {
  return (componentConstants[type] as any || {});
};
