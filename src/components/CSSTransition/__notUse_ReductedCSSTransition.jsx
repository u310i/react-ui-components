import React  from 'react';
import { Transition } from 'react-transition-group';
import { reflow } from 'scripts';

const appear = 'appear';
const enter = 'enter';
const exit = 'exit';

const getClassNames = type => {
  return [type, type + '-done'];
};

const removeClasses = (node, type) => {
  node.classList.remove(...getClassNames(type));
};

const CSSTransition = ({
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExited,
  ...props
}) => {
  const handleOnEnter = React.useCallback(
    (node, appearing) => {
      const classNameList = getClassNames(appearing ? appear : enter);
      reflow(node);
      removeClasses(node, exit);
      node.classList.add(classNameList[0]);

      if (onEnter) onEnter(node, appearing);
    },
    [onEnter]
  );

  const handleOnEntered = React.useCallback(
    (node, appearing) => {
      const classNameList = getClassNames(enter);
      removeClasses(node, appearing ? appear : enter);
      node.classList.add(classNameList[1]);

      if (onEntered) onEntered(node, appearing);
    },
    [onEntered]
  );

  const handleOnExit = React.useCallback(
    node => {
      const classNameList = getClassNames(exit);

      removeClasses(node, appear);
      removeClasses(node, enter);
      node.classList.add(classNameList[0]);

      if (onExit) onExit(node);
    },
    [onExit]
  );

  const handleOnExited = React.useCallback(node => {
    const classNameList = getClassNames(exit);

    removeClasses(node, exit);
    node.classList.add(classNameList[1]);

    if (onExited) onExited(node);
  }, []);

  return (
    <Transition
      {...props}
      onEnter={handleOnEnter}
      onEntered={handleOnEntered}
      onExit={handleOnExit}
      onExited={handleOnExited}
    />
  );
};

export default CSSTransition;
