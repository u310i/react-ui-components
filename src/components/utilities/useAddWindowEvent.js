export const useAddWindowEvent = (
  type,
  callback,
  disable = false,
  optimized = true
) => {
  useEffect(
    () => {
      if (!disable) {
        addEvent(type, callback, optimized);
      }
      return () => {
        if (!disable) {
          removeEvent(type, callback);
        }
      };
    },
    [disable]
  );
};

let events = {};

let clearEvent;

const loop = type => () => {
  events[type].forEach(f => f());
};

const addEvent = (type, callback, optimized) => {
  const eventsExists = events[type] && events[type].size > 0;
  if (!eventsExists) {
    events[type] = new Set();
  }
  events[type].add(callback);
  if (!eventsExists) {
    clearEvent = init(type, loop(type), optimized);
  }
};

const removeEvent = (type, callback) => {
  events[type].delete(callback);
  if (events[type].size === 0 && clearEvent != null) {
    clearEvent();
    clearEvent = null;
  }
};

const init = (type, baseEvent, optimized) => {
  const event = optimized ? createOptimizedEvent(baseEvent) : baseEvent;
  window.addEventListener(type, event);
  return () => {
    window.removeEventListener(type, event);
    delete events[type];
  };
};
