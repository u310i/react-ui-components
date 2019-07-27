import { deepMergeOverrideArray } from '..';

let globalConstants = {};

export const createAppConstants = (constants) => {
	globalConstants = constants;
};

let pageConstants = {};

export const createPageConstants = (constants) => {
	pageConstants = deepMergeOverrideArray(constants, globalConstants);
};

const componentConstants = {};

export const createComponentConstants = (constants, type) => {
	if (pageConstants[type]) {
		componentConstants[type] = deepMergeOverrideArray(constants, pageConstants[type]);
	} else {
		componentConstants[type] = constants;
	}
};

export const getComponentConstants = (type) => {
	return componentConstants[type] || {};
};
