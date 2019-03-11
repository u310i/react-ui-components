import React, { useMemo, useCallback, useRef } from 'react';
import { Transition } from 'react-transition-group';
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

  const style = useMemo(() => {
    return {
      main: {
        height: open ? 'auto' : collapsedHeight,
        transitionDuration: `${duration}ms`,
        transitionProperty: 'all',
        overflow: 'hidden'
      },
      inner: {
        display: 'flex'
      }
    };
  }, []);

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
      <DivElement style={style.main} className="uc-collapse">
        <DivElement
          elementRef={ref => {
            elRef.current = ref;
          }}
          style={style.inner}
          className="uc-collapse-inner"
        >
          {children}
        </DivElement>
      </DivElement>
    </Transition>
  );
};

export default Collapse;
