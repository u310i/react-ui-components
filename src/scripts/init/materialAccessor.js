import { deepMergeOverrideArray } from 'scripts';

let globalMaterials = {};

export const createAppMaterials = materials => {
  globalMaterials = materials;
};

let pageMaterials = {};

export const createPageMaterials = materials => {
  pageMaterials = deepMergeOverrideArray(materials, globalMaterials);
};

const componentMaterials = {};

export const createComponentMaterials = (materials, type) => {
  if (pageMaterials[type]) {
    componentMaterials[type] = deepMergeOverrideArray(
      materials,
      pageMaterials[type]
    );
  } else {
    componentMaterials[type] = materials;
  }
};

export const getComponentMaterials = type => {
  return componentMaterials[type] || {};
};
