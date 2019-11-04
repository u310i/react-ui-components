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

// type DeepOverrideObject<T, U> = {
//   [P in keyof T]: P extends $Type.KeyOfObject<U> ?
//   $Type.BranchIfObject<T[P], DeepOverrideObject<T[P], U[P]>, U[P] extends $Type.DeepWiden<T[P]>
//     ? U[P] : T[P]> : T[P];
// }

// export const overrideConstants = <T, U>(target: U, source: T): DeepOverrideObject<T, U> => {
//   if (!(isObject(target) && isObject(source))) return null

//   const destination = {} as any;
//   Object.keys(source).forEach((item) => {
//     const key = (item as keyof T & keyof U)

//     const isMergebleTargetKey = isMergeableObject(target[key])
//     const isMergebleSourceKey = isMergeableObject(source[key])
//     if (isMergebleTargetKey && isMergebleSourceKey) {
//       if (key === 'style') {
//         destination[key] = {
//           ...source[key],
//           ...target[key]
//         }
//       }
//       destination[key] = overrideConstants(target[key], source[key])
//     } else {
//       destination[key] = target[key] || source[key] || null
//     }

//     // destination[key] = target[key]
//     //   ? isMergeableObject(source[key])
//     //     ? override(source[key], target[key])
//     //     : Object.prototype.toString.call(source[key]) ===
//     //       Object.prototype.toString.call(target[key])
//     //       ? target[key]
//     //       : source[key]
//     //   : source[key];
//   });

//   return destination;
// };

// const map = new Map([['foo', 123], ['bar', 234]])

// const target = {
//   a: {
//     a_1: 'a_1_',
//   },
//   b: 'b_',
//   c: {
//     c_1: 'c_1_',
//     c_2: 'c_2_',
//     c_3: {
//       c_3_1: 'c_3_1_',
//       c_3_2: ['foo', 'bar', 'baz', 'foobaz'],
//     },
//   },
//   d: 'd_',
//   e: map
// } as const;

// const newMap = new Map([['foo', '100'], ['bar', '200']])

// const source = {
//   a: 'aa_',
//   b: {
//     b_1: 'bb_1_',
//   },
//   c: {
//     c_2: {
//       c_2_1: 'c_2_1_',
//     },
//     c_3: {
//       c_3_1: ['aaa', 'bbb'],
//       c_3_2: ['123', 'true'],
//     },
//   },
//   // d: ['AAA', 'BBB'],
//   e: newMap
// } as const;

// const obj: MergeObject<typeof target, typeof source, 'source'> = {
//   a: { a_1: 'a_1_' },
//   b: 'b_',
//   c: {
//     // c_1: 'c_1_',
//     c_2: 'c_2_',
//     c_3: { c_3_1: 'c_3_1_', c_3_2: ['foo', 'bar', 'baz', 'foobaz'] }
//   },
//   // d: 'd_',
//   e: map
// }

// console.log(obj);