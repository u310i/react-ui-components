import React from 'react';
import { Transition } from 'react-transition-group';
import {
  TransitionProps as _TransitionProps,
  TransitionStatus as _TransitionStatus,
  TransitionChildren as _TransitionChildren,
} from 'react-transition-group/Transition';
import { reflow, useForceUpdate } from 'scripts';

const APPEAR = 'appear';
const ENTER = 'enter';
const EXIT = 'exit';
const PREFIX_ACTIVE = '-active';
const PREFIX_DONE = '-done';

type TransitionType = 'appear' | 'enter' | 'exit';

const ALL_CLASS_NAMES = {
  appear: {
    start: APPEAR,
    active: APPEAR + PREFIX_ACTIVE,
    done: APPEAR + PREFIX_DONE,
  },
  enter: {
    start: ENTER,
    active: ENTER + PREFIX_ACTIVE,
    done: ENTER + PREFIX_DONE,
  },
  exit: {
    start: EXIT,
    active: EXIT + PREFIX_ACTIVE,
    done: EXIT + PREFIX_DONE,
  },
};

type ClassNames = {
  start: string;
  active: string;
  done: string;
};

const getClassNames = (type: TransitionType): ClassNames => {
  return ALL_CLASS_NAMES[type];
};

const removeClasses = (node: Element, type: TransitionType): void => {
  const classNameList = getClassNames(type);
  node.classList.remove(
    classNameList.start,
    classNameList.active,
    classNameList.done
  );
};

type TransitionActionKeys = 'appear' | 'enter' | 'exit';

type TransitionHandlerKeys =
  | 'onEnter'
  | 'onEntering'
  | 'onEntered'
  | 'onExit'
  | 'onExiting'
  | 'onExited';

type TransitionPropsKeys =
  | 'in'
  | 'mountOnEnter'
  | 'unmountOnExit'
  | 'addEndListener'
  | TransitionHandlerKeys
  | TransitionActionKeys;

type Props = $Type.CreateProps<
  {
    disableClassing?: boolean;
    lazyAppear?: boolean;
  } & Pick<_TransitionProps, TransitionPropsKeys>
>;

type CharacteristicProps = Pick<_TransitionProps, 'children' | 'timeout'>;

declare global {
  namespace $Type {
    namespace Transition {
      type childStatus = _TransitionStatus;
      type TransitionProps = Props;
    }
  }
}

const ReactCSSTransition: $Type.FunctionComponentWithoutChildren<
  Props & CharacteristicProps
> = ({
  children,
  in: inProp,
  appear = false,
  disableClassing = false,
  lazyAppear = false,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  ...other
}) => {
  const inRef = React.useRef<null | undefined | boolean>(null);
  const shouldTransitionOnAppear = React.useRef<null | boolean>(null);
  const appearingStates = React.useRef<{
    enter: null | boolean;
    entering: null | boolean;
    entered: null | boolean;
    appeared: null | boolean;
  }>({
    enter: null,
    entering: null,
    entered: null,
    appeared: null,
  });

  const forceUpdate = useForceUpdate();

  // When "appear" and "in" are true, "onEntered" occurs immediately after "onEntering", not after transition.
  // Transition occurs because the order is kept, but you can not execute anything after transition.
  // If "lazyAppear", "appear", and "inProp" are true, set "in" to false during the first rendering,
  //  do not execute "appearing" of "Transition", and generate as "appearing" after update The
  //  This is useful for "Collapse" using "Entered".
  if (
    shouldTransitionOnAppear.current === null &&
    lazyAppear &&
    appear &&
    inProp
  ) {
    shouldTransitionOnAppear.current = true;
    inRef.current = false;
  } else {
    inRef.current = inProp;
    shouldTransitionOnAppear.current = false;
  }

  React.useLayoutEffect(() => {
    if (shouldTransitionOnAppear.current) {
      appearingStates.current.enter = true;
      appearingStates.current.entering = true;
      appearingStates.current.entered = true;
      appearingStates.current.appeared = true;
      forceUpdate();
    }
  }, []);

  type EnterType = 'enter' | 'entering' | 'entered' | 'appeared';

  const isLazyAppear = React.useCallback((enterType: EnterType) => {
    return lazyAppear && appearingStates.current[enterType];
  }, []);

  const lazyAppearDone = React.useCallback((enterType: EnterType) => {
    return (appearingStates.current[enterType] = false);
  }, []);

  const handleOnEnter = React.useCallback(
    (node, appearing) => {
      const isAppearing = isLazyAppear('enter') || appearing;

      if (!disableClassing) {
        removeClasses(node, EXIT);
        const classNameList = getClassNames(isAppearing ? APPEAR : ENTER);
        node.classList.add(classNameList.start);
      }
      if (onEnter) onEnter(node, isAppearing);

      if (isAppearing) lazyAppearDone('enter');
    },
    [onEnter]
  );

  const handleOnEntering = React.useCallback(
    (node, appearing) => {
      reflow(node);
      const isAppearing = isLazyAppear('entering') || appearing;

      if (!disableClassing) {
        const classNameList = getClassNames(isAppearing ? APPEAR : ENTER);
        node.classList.add(classNameList.active);
      }
      if (onEntering) onEntering(node, lazyAppear ? isAppearing : appearing);

      if (isAppearing) lazyAppearDone('entering');
    },
    [onEntering]
  );

  const handleOnEntered = React.useCallback(
    (node, appearing) => {
      const isAppearing = isLazyAppear('entered') || appearing;

      if (!disableClassing) {
        removeClasses(node, isAppearing ? APPEAR : ENTER);
        const classNameList = getClassNames(ENTER);
        node.classList.add(classNameList.done);
      }
      if (onEntered) onEntered(node, lazyAppear ? isAppearing : appearing);

      if (isAppearing) {
        lazyAppearDone('entered');
        lazyAppearDone('appeared');
      }
    },
    [onEntered]
  );

  const handleOnExit = React.useCallback(
    node => {
      if (isLazyAppear('appeared')) {
        lazyAppearDone('enter');
        lazyAppearDone('entering');
        lazyAppearDone('entered');
        lazyAppearDone('appeared');
      }
      if (!disableClassing) {
        const classNameList = getClassNames(EXIT);

        removeClasses(node, APPEAR);
        removeClasses(node, ENTER);
        node.classList.add(classNameList.start);
      }
      if (onExit) onExit(node);
    },
    [onExit]
  );

  const handleOnExiting = React.useCallback(
    node => {
      reflow(node);
      if (!disableClassing) {
        const classNameList = getClassNames(EXIT);

        node.classList.add(classNameList.active);
      }
      if (onExiting) onExiting(node);
    },
    [onExiting]
  );

  const handleOnExited = React.useCallback(node => {
    if (!disableClassing) {
      const classNameList = getClassNames(EXIT);
      removeClasses(node, EXIT);
      node.classList.add(classNameList.done);
    }
    if (onExited) onExited(node);
  }, []);

  return (
    <Transition
      in={inRef.current}
      appear={appear}
      onEnter={handleOnEnter}
      onEntering={handleOnEntering}
      onEntered={handleOnEntered}
      onExit={handleOnExit}
      onExiting={handleOnExiting}
      onExited={handleOnExited}
      {...other}
    />
  );
};

export default ReactCSSTransition;
