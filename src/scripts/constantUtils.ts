import * as React from 'react';

export const isMergeableObject = (value: any): boolean => {
  return isNonNullObject(value) && !isSpecial(value);
};

const isNonNullObject = (value: any): boolean => {
  return !!value && typeof value === 'object';
};

const isSpecial = (value: object): boolean => {
  const stringValue = Object.prototype.toString.call(value);

  return (
    stringValue === '[object Array]' ||
    stringValue === '[object Function]' ||
    stringValue === '[object RegExp]' ||
    stringValue === '[object Date]' ||
    React.isValidElement(value)
  );
};

type DeepOverrideObject<T, U> = {
  [P in keyof T]: P extends $Type.KeyofObjectIfObject<U> ?
  $Type.BranchIfObject<T[P], DeepOverrideObject<T[P], U[P]>, U[P] extends $Type.DeepWiden<T[P]>
    ? U[P] : T[P]> : T[P];
}


export const mergeConstant = <T>(target: T, source: T) => {
  const destination = {} as any;
  const mergeableTarget = isMergeableObject(target) ? target : {}
  const mergeableSource = isMergeableObject(source) ? source : {}
  Object.keys({ ...mergeableTarget, ...mergeableSource }).forEach(key => {
    const typedKey = (key as keyof T)
    if (target[typedKey] && !source[typedKey]) {
      destination[typedKey] = target[typedKey]
    } else if (!target[typedKey] && source[typedKey]) {
      destination[typedKey] = source[typedKey]
    } else if (!target[typedKey] && !source[typedKey]) {
      destination[typedKey] = null
    } else {
      const targetIsMergeable = isMergeableObject(target[typedKey])
      const sourceIsMergeable = isMergeableObject(source[typedKey])
      destination[typedKey] = (targetIsMergeable && !sourceIsMergeable) ? target[typedKey] : (!targetIsMergeable && sourceIsMergeable) ? source[typedKey]
        : (targetIsMergeable && sourceIsMergeable) ? mergeConstant(target[typedKey], source[typedKey]) : source[typedKey]
    }
  });

  return destination;
};

const override = <T, U>(target: T, source: U): DeepOverrideObject<T, U> => {
  const destination = {} as any;
  Object.keys(target).forEach((key) => {
    const typedKey = (key as keyof T & keyof U)
    destination[typedKey] = source[typedKey]
      ? isMergeableObject(target[typedKey])
        ? override(target[typedKey], source[typedKey])
        : Object.prototype.toString.call(target[typedKey]) ===
          Object.prototype.toString.call(source[typedKey])
          ? source[typedKey]
          : target[typedKey]
      : target[typedKey];
  });

  return destination;
};

export const overrideConstant = <T, U>(target: T, source: U) => {
  if (!target || !source) return null;
  return override(target, source);
};
