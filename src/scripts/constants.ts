import { mergeObject } from '.'

type WidenConstants = $Type.DeepWiden<$Type.DeepPartial<$Type.Constants.All>>;

let globalConstants: WidenConstants = {};

export const createAppConstants = (constants: WidenConstants): void => {
  globalConstants = constants;
};


let pageConstants: WidenConstants = {};
export const createPageConstants = (constants: WidenConstants): void => {
  pageConstants = mergeObject(constants, globalConstants, { tree: 'both', overrides: ['style'] }) || {};
};

type OriginConstants = $Type.DeepPartial<$Type.DeepMutable<$Type.Constants.All>>
const componentConstants: OriginConstants = {}

export const createComponentConstants = <K extends keyof $Type.Constants.All>(
  type: K,
  constants: $Type.Constants.All[K]
): void => {
  componentConstants[type] = ((pageConstants && pageConstants[type])
    ? (mergeObject(pageConstants[type], constants, { tree: 'source', overrides: ['style'] }) || {})
    : constants) as OriginConstants[K]
};

export const getComponentConstants = <K extends keyof $Type.Constants.All>(
  type: K
): $Type.Constants.All[K] => {
  return (componentConstants[type] as any || {});
};
