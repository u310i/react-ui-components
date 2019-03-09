import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Transition, CSSTransition } from 'react-transition-group';
import { DivElement } from 'elements';

const Collapse = ({
  open,
  children,
  duration,
  timingFunction,
  collapsedHeight = '0px',
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  ...props
}) => {
  const elRef = useRef(null);
  const [height, setHeight] = useState(0);

  const style = useMemo(() => {
    return {
      height: open ? 'auto' : collapsedHeight,
      transitionDuration: `${duration}ms`,
      transitionProperty: 'all',
      overflow: 'hidden'
    };
  }, []);
  const transitionStyle = {
    entering: {
      // height: 'auto',
      // transitionDuration: `${duration}ms`,
      // transitionProperty: 'all'
    },
    entered: {
      // height: 'auto',
      // overflow: 'hidden'
    },
    exiting: {
      // height: 0,
      // transitionDuration: `400ms`,
      // transitionProperty: 'all'
    },
    exited: {
      // height: 0
    }
  };
  // console.log('test:   ' + height);
  // console.log(ref);

  const handleEnter = useCallback(
    node => {
      node.style.height = collapsedHeight;
      if (onEnter) onEnter(node);
    },
    [onEnter]
  );

  const handleEntering = useCallback(
    node => {
      node.style.height = `${elRef.current.clientHeight}px`;
      if (onEntering) onEntering(node);
    },
    [onEntering]
  );

  const handleEntered = useCallback(
    node => {
      node.style.height = `auto`;
      if (onEntered) onEntered(node);
    },
    [onEntered]
  );

  const handleExit = useCallback(
    node => {
      node.style.height = `${elRef.current.clientHeight}px`;
      node.scrollTop;
      if (onExit) onExit(node);
    },
    [onExit, elRef.current]
  );

  const handleExiting = useCallback(
    node => {
      node.style.height = collapsedHeight;
      if (onExiting) onExiting(node);
    },
    [onExiting]
  );

  return (
    <Transition
      in={open}
      timeout={duration}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      {...props}
    >
      {state => {
        return (
          <DivElement style={{ ...style, ...transitionStyle[state] }}>
            <DivElement
              elementRef={ref => {
                elRef.current = ref;
              }}
              style={{ display: 'flex' }}
            >
              {children}
            </DivElement>
          </DivElement>
        );
      }}
    </Transition>
  );
};

export default Collapse;
