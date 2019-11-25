import React from "react";
import { Transition } from "react-transition-group";
import {
  TransitionProps as _TransitionProps,
  TransitionStatus as _TransitionStatus,
  TransitionChildren as _TransitionChildren,
  EnterHandler,
  ExitHandler
} from "react-transition-group/Transition";
import { reflow } from "scripts";

const APPEAR = "appear";
const ENTER = "enter";
const EXIT = "exit";
const SUFFIX_ACTIVE = "-active";
const SUFFIX_DONE = "-done";

type TransitionType = "appear" | "enter" | "exit";

const ALL_CLASS_NAMES = {
  appear: {
    start: APPEAR,
    active: APPEAR + SUFFIX_ACTIVE,
    done: APPEAR + SUFFIX_DONE
  },
  enter: {
    start: ENTER,
    active: ENTER + SUFFIX_ACTIVE,
    done: ENTER + SUFFIX_DONE
  },
  exit: {
    start: EXIT,
    active: EXIT + SUFFIX_ACTIVE,
    done: EXIT + SUFFIX_DONE
  }
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

type TransitionActionKeys = "appear" | "enter" | "exit";

type TransitionHandlerKeys =
  | "onEnter"
  | "onEntering"
  | "onEntered"
  | "onExit"
  | "onExiting"
  | "onExited";

type TransitionPropsKeys =
  | "mountOnEnter"
  | "unmountOnExit"
  | "addEndListener"
  | TransitionHandlerKeys
  | TransitionActionKeys;

type ComponentProps = { in?: boolean } & {
  disableClassing?: boolean;
  lazyAppear?: boolean;
} & Pick<_TransitionProps, TransitionPropsKeys | "children"> &
  Partial<Pick<_TransitionProps, "timeout">>;

type Props = ComponentProps;

declare global {
  namespace $Type {
    namespace Components {
      namespace CSSTransition {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
        type _ChildStatus = _TransitionStatus;
      }
    }
  }
}

const CSSTransition: $Type.ReactUtils.FCWithoutChildren<Props> = ({
  children,
  in: inProp = false,
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
  ...other
}) => {
  // Order and timing of execution
  // enter => layout => painted => entering => entered(after transition)

  const handleOnEnter = React.useCallback<EnterHandler>(
    (node, appearing) => {
      if (!disableClassing) {
        removeClasses(node, EXIT);
        const classNameList = getClassNames(appearing ? APPEAR : ENTER);
        node.classList.add(classNameList.start);
      }
      if (onEnter) onEnter(node, appearing);
    },
    [onEnter]
  );

  const handleOnEntering = React.useCallback<EnterHandler>(
    (node, appearing) => {
      reflow(node);
      if (!disableClassing) {
        const classNameList = getClassNames(appearing ? APPEAR : ENTER);
        node.classList.add(classNameList.active);
      }
      if (onEntering) onEntering(node, lazyAppear ? appearing : appearing);
    },
    [onEntering]
  );

  const handleOnEntered = React.useCallback<EnterHandler>(
    (node, appearing) => {
      if (!disableClassing) {
        removeClasses(node, appearing ? APPEAR : ENTER);
        const classNameList = getClassNames(ENTER);
        node.classList.add(classNameList.done);
      }
      if (onEntered) onEntered(node, lazyAppear ? appearing : appearing);
    },
    [onEntered]
  );

  const handleOnExit = React.useCallback<ExitHandler>(
    node => {
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
      {...other}
      in={inProp}
      timeout={timeout}
      appear={appear}
      onEnter={handleOnEnter}
      onEntering={handleOnEntering}
      onEntered={handleOnEntered}
      onExit={handleOnExit}
      onExiting={handleOnExiting}
      onExited={handleOnExited}
    >
      {children}
    </Transition>
  );
};

export default CSSTransition;
