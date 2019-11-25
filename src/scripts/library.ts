import raf from 'raf';
import deepmerge from 'deepmerge';
import { keyframes as emotionKeyframes } from 'emotion';
import mousetrap from 'mousetrap';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

type DeepMerge = <T1, T2>(
  target: Partial<T1>,
  source: Partial<T2>,
  options?: deepmerge.Options
) => T1;

const deepMerge: DeepMerge = (target, source, options) => {
  return deepmerge(target, source, options);
};

const deepMergeOverrideArray: DeepMerge = (target, source) => {
  return deepMerge(target, source, { arrayMerge: (_x, y, _options) => y });
};

const keyframes = emotionKeyframes;

const scrollLock = {
  lock: disableBodyScroll,
  restore: enableBodyScroll,
  clearAll: clearAllBodyScrollLocks,
};

export {
  raf,
  deepMerge,
  deepMergeOverrideArray,
  keyframes,
  mousetrap,
  scrollLock,
};
