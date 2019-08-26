import tabbable from 'tabbable';
import { extractElement } from 'scripts';

declare global {
  namespace $Type {
    namespace Components {
      namespace FocusTrap {
        type Options = {
          onActivate?: () => void;
          onDeactivate?: () => void;
          initialFocus?: IncludeElement;
          fallbackFocus?: IncludeElement;
          returnFocusOnDeactivate?: boolean;
          disableEscapeKeyDown?: boolean;
          disableOutsideClick?: boolean;
        };

        type Instance = {
          activate(activateOptions?: Options): void;
          deactivate(deactivateOptions?: Options): void;
          pause(): void;
          unpause(): void;
        };
      }
    }
  }
}

import $FocusTrapType = $Type.Components.FocusTrap;

let activeFocusDelay: number;

const activeFocusTraps = (() => {
  const trapQueue = [] as $FocusTrapType.Instance[];
  return {
    activateTrap: (trap: $FocusTrapType.Instance) => {
      if (trapQueue.length > 0) {
        const activeTrap = trapQueue[trapQueue.length - 1];
        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      const trapIndex = trapQueue.indexOf(trap);
      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },

    deactivateTrap: (trap: $FocusTrapType.Instance) => {
      const trapIndex = trapQueue.indexOf(trap);
      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    },
  };
})();

type State = {
  firstTabbableNode: Element | null;
  lastTabbableNode: Element | null;
  nodeFocusedBeforeActivation: Element | null;
  mostRecentlyFocusedNode: Element | null;
  active: boolean;
  paused: boolean;
};

export const focusTrap = (
  element: any,
  userOptions: $FocusTrapType.Options
): $FocusTrapType.Instance => {
  const doc = document;
  const container =
    typeof element === 'string' ? doc.querySelector(element) : element;

  const config: $FocusTrapType.Options = {
    returnFocusOnDeactivate: true,
    disableEscapeKeyDown: false,
    ...userOptions,
  };

  const state: State = {
    firstTabbableNode: null,
    lastTabbableNode: null,
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
  };

  const activate = (activateOptions?: $FocusTrapType.Options) => {
    if (state.active) return;

    updateTabbableNodes();

    state.active = true;
    state.paused = false;
    state.nodeFocusedBeforeActivation = doc.activeElement as Element;

    const onActivate =
      activateOptions && activateOptions.onActivate
        ? activateOptions.onActivate
        : config.onActivate;
    if (onActivate) {
      onActivate();
    }

    addListeners();
    return trap;
  };

  const deactivate = (deactivateOptions?: $FocusTrapType.Options) => {
    if (!state.active) return;

    window.clearTimeout(activeFocusDelay);

    removeListeners();
    state.active = false;
    state.paused = false;

    activeFocusTraps.deactivateTrap(trap);

    if (deactivateOptions) {
      const onDeactivate =
        deactivateOptions.onDeactivate !== undefined
          ? deactivateOptions.onDeactivate
          : config.onDeactivate;
      if (onDeactivate) {
        onDeactivate();
      }

      const returnFocus =
        deactivateOptions.returnFocusOnDeactivate !== undefined
          ? deactivateOptions.returnFocusOnDeactivate
          : config.returnFocusOnDeactivate;
      if (returnFocus) {
        delay(() => {
          tryFocus(state.nodeFocusedBeforeActivation);
        });
      }
    }

    return trap;
  };

  const pause = () => {
    if (state.paused || !state.active) return;
    state.paused = true;
    removeListeners();
  };

  const unpause = () => {
    if (!state.paused || !state.active) return;
    state.paused = false;
    updateTabbableNodes();
    addListeners();
  };

  const addListeners = () => {
    if (!state.active) return;

    // There can be only one listening focus trap at a time
    activeFocusTraps.activateTrap(trap);

    // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.
    activeFocusDelay = delay(() => {
      tryFocus(getInitialFocusNode());
    });

    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false,
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false,
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false,
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false,
    });

    return trap;
  };

  const removeListeners = () => {
    if (!state.active) return;

    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);

    return trap;
  };

  const extractElementForOption = (
    optionName: 'initialFocus' | 'fallbackFocus'
  ): $Type.MaybeElement => {
    const optionValue = config[optionName];
    if (!optionValue) {
      return null;
    }
    const node = extractElement(optionValue);
    return node;
  };

  const getInitialFocusNode = (): Element => {
    let node: any;
    if (extractElementForOption('initialFocus') !== null) {
      node = extractElementForOption('initialFocus');
    } else if (container.contains(doc.activeElement)) {
      node = doc.activeElement;
    } else {
      node =
        state.firstTabbableNode || extractElementForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error(
        "You can't have a focus-trap without at least one focusable element"
      );
    }

    return node;
  };

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.
  const checkPointerDown = (e: MouseEvent | TouchEvent): void => {
    if (container.contains(e.target)) return;
    if (!config.disableOutsideClick) {
      deactivate({
        returnFocusOnDeactivate: !tabbable.isFocusable(e.target as HTMLElement),
      });
    } else {
      e.preventDefault();
    }
  };

  // In case focus escapes the trap for some strange reason, pull it back in.
  const checkFocusIn = (e: Event): void => {
    // In Firefox when you Tab out of an iframe the Document is briefly focused.
    if (container.contains(e.target) || e.target instanceof Document) {
      return;
    }
    e.stopImmediatePropagation();
    tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
  };

  const checkKey = (e: KeyboardEvent) => {
    if (!config.disableEscapeKeyDown && isEscapeEvent(e)) {
      e.preventDefault();
      deactivate();
      return;
    }
    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };

  // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.
  const checkTab = (e: KeyboardEvent): void => {
    updateTabbableNodes();
    if (e.shiftKey && e.target === state.firstTabbableNode) {
      e.preventDefault();
      tryFocus(state.lastTabbableNode);
      return;
    }
    if (!e.shiftKey && e.target === state.lastTabbableNode) {
      e.preventDefault();
      tryFocus(state.firstTabbableNode);
      return;
    }
  };

  const checkClick = (e: MouseEvent): void => {
    if (!config.disableOutsideClick) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  };

  const updateTabbableNodes = (): void => {
    const tabbableNodes = tabbable(container);
    state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
    state.lastTabbableNode =
      tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
  };

  const tryFocus = (node: Element | null): void => {
    if (node === doc.activeElement) return;
    if (!node || !(node as HTMLElement).focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    (node as HTMLElement).focus();
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };

  const trap = {
    activate,
    deactivate,
    pause,
    unpause,
  };

  return trap;
};

const isSelectableInput = (node: Element): node is HTMLInputElement => {
  return (
    'tagName' in node &&
    node.tagName.toLowerCase() === 'input' &&
    'select' in node &&
    typeof (node as HTMLInputElement).select === 'function'
  );
};

const isEscapeEvent = (e: KeyboardEvent): boolean => {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
};

const isTabEvent = (e: KeyboardEvent): boolean => {
  return e.key === 'Tab' || e.keyCode === 9;
};

const delay = (fn: () => void): number => {
  return window.setTimeout(fn, 0);
};
