import React from 'react';
import { Transition } from 'react-transition-group';
import {
  TransitionProps as _TransitionProps,
  TransitionStatus as _TransitionStatus,
  TransitionChildren as _TransitionChildren,
  EnterHandler,
  ExitHandler,
} from 'react-transition-group/Transition';
import { reflow, useForceUpdate } from 'scripts';

const APPEAR = 'appear';
const ENTER = 'enter';
const EXIT = 'exit';
const SUFFIX_ACTIVE = '-active';
const SUFFIX_DONE = '-done';

type TransitionType = 'appear' | 'enter' | 'exit';

const ALL_CLASS_NAMES = {
  appear: {
    start: APPEAR,
    active: APPEAR + SUFFIX_ACTIVE,
    done: APPEAR + SUFFIX_DONE,
  },
  enter: {
    start: ENTER,
    active: ENTER + SUFFIX_ACTIVE,
    done: ENTER + SUFFIX_DONE,
  },
  exit: {
    start: EXIT,
    active: EXIT + SUFFIX_ACTIVE,
    done: EXIT + SUFFIX_DONE,
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
  | 'timeout'
  | 'mountOnEnter'
  | 'unmountOnExit'
  | 'addEndListener'
  | TransitionHandlerKeys
  | TransitionActionKeys;

type Props = $Type.ReactUtils.CreateProps<
  { in: boolean } & {
    disableClassing?: boolean;
    lazyAppear?: boolean;
  } & Pick<_TransitionProps, TransitionPropsKeys>
>;

type CharacteristicProps = Pick<_TransitionProps, 'children'>;

declare global {
  namespace $Type {
    namespace Components {
      type CSSTransitionProps = Props;
      type CSSTransitionChildStatus = _TransitionStatus;
    }
  }
}

const ReactCSSTransition: $Type.ReactUtils.FunctionComponentWithoutChildren<
  Props & CharacteristicProps & { testId?: string }
> = ({
  children,
  in: inProp,
  timeout = 300,
  appear = false,
  disableClassing = false,
  lazyAppear = false,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  testId,
  ...other
}) => {
  const inRef = React.useRef<null | undefined | boolean>(null);
  const shouldTransitionOnAppear = React.useRef<null | boolean>(null);

  type AppearingStates = {
    enter: null | boolean;
    entering: null | boolean;
    entered: null | boolean;
  };
  const appearingStates = React.useRef<AppearingStates>({
    enter: null,
    entering: null,
    entered: null,
  });

  const forceUpdate = useForceUpdate();

  // When "appear" and "in" are true, "onEntered" occurs immediately after "onEntering", not after transition.
  // Transition occurs because the order is kept, but you can not execute anything after transition.
  // If "lazyAppear", "appear", and "inProp" are true, set "in" to false during the first rendering,
  //  do not execute "appearing" of "Transition", and generate as "appearing" after update The
  //  This is useful for "Collapse" using "Entered".

  // Order and timing of execution
  // enter => layout => painted => entering => entered(after transition)
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
    testId === 'slide' && console.log('layout');
    if (shouldTransitionOnAppear.current) {
      appearingStates.current.enter = true;
      appearingStates.current.entering = true;
      appearingStates.current.entered = true;
      forceUpdate();
    }
  }, []);
  React.useEffect(() => {
    testId === 'slide' && console.log('painted');
  }, []);

  type EnterType = keyof AppearingStates;

  const isLazyAppear = React.useCallback((enterType: EnterType) => {
    return lazyAppear && appearingStates.current[enterType];
  }, []);

  const lazyAppearDone = React.useCallback((enterType: EnterType) => {
    return (appearingStates.current[enterType] = false);
  }, []);

  const handleOnEnter = React.useCallback<EnterHandler>(
    (node, appearing) => {
      testId === 'slide' && console.log('enter');
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

  const handleOnEntering = React.useCallback<EnterHandler>(
    (node, appearing) => {
      testId === 'slide' && console.log('entering');
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

  const handleOnEntered = React.useCallback<EnterHandler>(
    (node, appearing) => {
      testId === 'slide' && console.log('entered');
      const isAppearing = isLazyAppear('entered') || appearing;

      if (!disableClassing) {
        removeClasses(node, isAppearing ? APPEAR : ENTER);
        const classNameList = getClassNames(ENTER);
        node.classList.add(classNameList.done);
      }
      if (onEntered) onEntered(node, lazyAppear ? isAppearing : appearing);

      if (isAppearing) {
        lazyAppearDone('entered');
      }
    },
    [onEntered]
  );

  const handleOnExit = React.useCallback<ExitHandler>(
    node => {
      if (isLazyAppear('entered')) {
        lazyAppearDone('enter');
        lazyAppearDone('entering');
        lazyAppearDone('entered');
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

  const handleOnExiting = React.useCallback<ExitHandler>(
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

  const handleOnExited = React.useCallback<ExitHandler>(node => {
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
      timeout={timeout}
      appear={appear}
      onEnter={handleOnEnter}
      onEntering={handleOnEntering}
      onEntered={handleOnEntered}
      onExit={handleOnExit}
      onExiting={handleOnExiting}
      onExited={handleOnExited}
      {...other}
    >
      {children}
    </Transition>
  );
};

export default ReactCSSTransition;
