import React from 'react';

export const useGetDomProperty = (ref, propertyName, callback, enable, dependencies = []) => {
	const [ state, setState ] = React.useState(false);
	React.useLayoutEffect(() => {
		if (enable) {
			setState((prev) => callback(prev, ref.current[propertyName]));
		}
	}, dependencies);
	return state;
};

export const useGetDomProperties = (ref, propertyNameList, callback, enable, dependencies = []) => {
	const [ state, setState ] = React.useState(false);
	React.useLayoutEffect(() => {
		if (enable) {
			const value = {};
			for (let name of propertyNameList) {
				value[name] = ref.current[name];
			}
			setState((prev) => callback(prev, value));
		}
	}, dependencies);
	return state;
};
