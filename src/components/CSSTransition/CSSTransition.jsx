import React, { useCallback } from 'react';
import { Transition } from 'react-transition-group';
import { reflow } from 'scripts';

const appear = 'appear';
const enter = 'enter';
const exit = 'exit';

const getClassNames = type => {
  return [type, type + '-active', type + '-done'];
};

const removeClasses = (node, type) => {
  node.classList.remove(...getClassNames(type));
};

const ReactCSSTransitionFork = ({
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  ...props
}) => {
  const handleOnEnter = useCallback(
    (node, appearing) => {
      const classNameList = getClassNames(appearing ? appear : enter);

      removeClasses(node, exit);
      node.classList.add(classNameList[0]);

      if (onEnter) onEnter(node, appearing);
    },
    [onEnter]
  );

  const handleOnEntering = useCallback(
    (node, appearing) => {
      const classNameList = getClassNames(appearing ? appear : enter);

      reflow(node);
      node.classList.add(classNameList[1]);

      if (onEntering) onEntering(node, appearing);
    },
    [onEntering]
  );

  const handleOnEntered = useCallback(
    (node, appearing) => {
      const classNameList = getClassNames(enter);
      removeClasses(node, appearing ? appear : enter);
      node.classList.add(classNameList[2]);

      if (onEntered) onEntered(node, appearing);
    },
    [onEntered]
  );

  const handleOnExit = useCallback(
    node => {
      const classNameList = getClassNames(exit);

      removeClasses(node, appear);
      removeClasses(node, enter);
      node.classList.add(classNameList[0]);

      if (onExit) onExit(node);
    },
    [onExit]
  );

  const handleOnExiting = useCallback(
    node => {
      const classNameList = getClassNames(exit);

      reflow(node);
      node.classList.add(classNameList[1]);

      if (onExiting) onExiting(node);
    },
    [onExiting]
  );

  const handleOnExited = useCallback(node => {
    const classNameList = getClassNames(exit);

    removeClasses(node, exit);
    node.classList.add(classNameList[2]);

    if (onExited) onExited(node);
  }, []);

  return (
    <Transition
      {...props}
      onEnter={handleOnEnter}
      onEntering={handleOnEntering}
      onEntered={handleOnEntered}
      onExit={handleOnExit}
      onExiting={handleOnExiting}
      onExited={handleOnExited}
    />
  );
};

export default ReactCSSTransitionFork;
