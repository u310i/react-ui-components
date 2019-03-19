import React, { useMemo, useCallback, useRef } from 'react';
import $ from './_materials';
import { reflow, genTransitionProp, genDurationsEasings } from 'scripts';
import CSSTransition from '../CSSTransition';
import { DivElement } from '../_Elements';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const Collapse = ({
  in: inProp,
  children,
  duration = $styles.duration,
  easing = $styles.easing,
  collapsedHeight = $styles.collapsedHeight,
  appear = true,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  ...props
}) => {
  const elRef = useRef(null);

  const [durations, easings] = genDurationsEasings(duration, easing);

  const style = useMemo(() => {
    return {
      main: {
        height: !appear && inProp ? $styles.height : collapsedHeight,
        overflow: $styles.overflow,
        [$selectors.enters]: {
          transition: genTransitionProp([
            [$styles.transitionProperty, durations.enter, easings.enter]
          ])
        },
        [$selectors.exit]: {
          transition: genTransitionProp([
            [$styles.transitionProperty, durations.exit, easings.exit]
          ])
        }
      },
      inner: $styles.inner
    };
  }, []);

  const handleEntering = useCallback(
    (node, appearing) => {
      reflow(node);
      node.style.height = `${elRef.current.clientHeight}px`;
      if (onEntering) onEntering(node, appearing);
    },
    [onEntering]
  );

  const handleEntered = useCallback(
    (node, appearing) => {
      node.style.height = $styles.height;
      if (onEntered) onEntered(node, appearing);
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
    <CSSTransition
      in={inProp}
      timeout={durations}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      appear={appear}
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
              refer={elRef}
              style={style.inner}
              className={$names.ucCollapseInner}
            >
              {children}
            </DivElement>
          </DivElement>
        );
      }}
    </CSSTransition>
  );
};

export default Collapse;
