import { createOptimizedEvent } from '.';

// Safely detecting option support
// https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener
const passiveSupported = (() => {
  if (
    typeof window === 'undefined' ||
    typeof window.addEventListener !== 'function'
  ) {
    return;
  }

  let passive = false;

  const options = Object.defineProperty({}, 'passive', {
    get() {
      passive = true;
    },
  });

  const noop = () => { };

  window.addEventListener('testPassiveEventSupport', noop, options);
  window.removeEventListener('testPassiveEventSupport', noop, options);

  return passive;
})();

export const testPassiveEventSupport = () => passiveSupported;

const createListenerOptions = passiveSupported
  ? (options: AddEventListenerOptions) => {
    const passive =
      typeof options.passive === 'undefined' ? true : options.passive;
    return {
      ...options,
      passive: passive,
    };
  }
  : (options: AddEventListenerOptions) => {
    return options.capture || {};
  };


type addEventListenerArgs = $Type.Components.EventListenerProps
export const addEventListener = (
  target: $Type.ReactUtils.MaybeNode<EventTarget>,
  type: addEventListenerArgs['type'],
  listener: addEventListenerArgs['listener'],
  options: addEventListenerArgs['options'] = {},
  optimized: addEventListenerArgs['optimized'] = false
): (() => void) | null => {
  if (!target || !type || !listener) return null

  const optimizeClearlRef: {
    clear: null | (() => void);
  } = {
    clear: null,
  };
  const eventListener = optimized
    ? createOptimizedEvent(listener, optimizeClearlRef)
    : listener;

  const listenerOptions = createListenerOptions(options);
  target.addEventListener(type, eventListener, listenerOptions);

  return () => {
    optimizeClearlRef.clear && optimizeClearlRef.clear();
    target.removeEventListener(type, eventListener, listenerOptions);
  };
};
