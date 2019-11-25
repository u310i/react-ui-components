import * as React from 'react';
import { isObject } from './checkTypes'

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


type Tree = 'both' | 'target' | 'source' | undefined

type MergeIfObject<P, T, S, OTree extends Tree> = P extends 'style' ? Omit<S, keyof T> & T : MergeObject<T, S, OTree>

type BranchIfMergebleObject<T, S, Posi, Nega> = $Type.IsObject<T> extends true ?
  ($Type.IsObject<S> extends true ? Posi : T)
  : ($Type.IsObject<S> extends true ? S : Nega)

type Merge<B, T, S, OTree extends Tree> = {
  [P in keyof B]: P extends keyof T ?
  (P extends keyof S ?
    BranchIfMergebleObject<T[P], S[P], MergeIfObject<P, T[P], S[P], OTree>, T[P]>
    : T[P])
  : (P extends keyof S ? S[P] : never)
}

type BranchByTree<OTree extends Tree, Both, Target, Source> = (OTree extends 'both' ? Both : OTree extends 'target' ? Target : Source)

type MergeObject<T, S, OTree extends Tree> = BranchIfMergebleObject<T, S,
  BranchByTree<OTree, Merge<T & Omit<S, keyof T>, T, S, OTree>, Merge<T, T, S, OTree>, Merge<S, T, S, OTree>>,
  never
>

const mergeObject = <T, S, OTree extends Tree>(target: T, source: S, option: { tree?: OTree, overrides?: string[] } = {}): MergeObject<T, S, OTree> | null => {
  if (!isObject(target) || !isObject(source)) {
    if (isObject(target)) return target as any
    if (isObject(source)) return source as any
    return null
  }

  const destination = {} as any;
  const treeObject = option.tree === 'both' ? { ...source, ...target } : option.tree === 'target' ? target : source

  const targetObj = target as any
  const sourceObj = source as any

  Object.keys(treeObject).forEach(key => {
    const isMergebleTargetKey = isMergeableObject(targetObj[key])
    const isMergebleSourceKey = isMergeableObject(sourceObj[key])
    if (isMergebleTargetKey && isMergebleSourceKey) {
      if (option.overrides) {
        option.overrides.forEach((name) => {
          if (key === name) {
            destination[key] = {
              ...sourceObj[key],
              ...targetObj[key]
            }
          }
        })
      }
      destination[key] = mergeObject(targetObj[key], sourceObj[key], option)
    } else {
      destination[key] = targetObj[key] || sourceObj[key] || null
    }
  });

  return destination;
};

export default mergeObject
