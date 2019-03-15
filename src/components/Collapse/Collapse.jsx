import React, { useMemo, useCallback, useRef } from 'react';
import $materials from './_materials';
import { reflow } from 'scripts';
import { Transition } from 'react-transition-group';
import { DivElement } from 'elements';

const $names = $materials.names;
const $styles = $materials.styles;

const Collapse = ({
  in: inProp,
  children,
  duration = $styles.defaultDuration,
  easing = $styles.defaultEasing,
  collapsedHeight = $styles.collapsedHeight,
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
        height: inProp ? $styles.defaultHeight : collapsedHeight,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easing,
        ...$styles.main
      },
      inner: $styles.inner
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
      node.style.height = $styles.defaultHeight;
      if (onEntered) onEntered(node);
    },
    [onEntered]
  );

  const handleExit = useCallback(
    node => {
      node.style.height = `${elRef.current.clientHeight}px`;
      reflow(node);
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
      in={inProp}
      timeout={duration}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      {...props}
    >
      {(state, childProps) => {
        return (
          <DivElement
            style={style.main}
            className={$names.ucCollapse}
            {...childProps}
          >
            <DivElement
              elementRef={ref => {
                elRef.current = ref;
              }}
              style={style.inner}
              className={$names.ucCollapseInner}
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
