import React, { useMemo, useCallback } from 'react';
import $materials from './_materials';
import { reflow, roundNumber, genTransitionProp } from 'scripts';
import { Transition } from 'react-transition-group';
import { DivElement } from 'elements';

const $names = $materials.names;
const $styles = $materials.styles;

const Grow = ({
  in: inProp,
  children,
  duration = $styles.defaultDuration,
  easing = $styles.defaultEasing,
  appear = true,
  onEnter,
  ...props
}) => {
  const handleEnter = useCallback(
    node => {
      reflow(node);
      node.style.transition = genTransitionProp([
        [$styles.transitionOpacity, duration, easing],
        [
          $styles.transitionTransform,
          roundNumber(duration * $styles.scaleDurationRatio, 0),
          easing
        ]
      ]);
      if (onEnter) onEnter(node);
    },
    [onEnter]
  );

  const handleExit = useCallback(
    node => {
      node.style.transition = genTransitionProp([
        [$styles.transitionOpacity, duration, easing],
        [
          $styles.transitionTransform,
          roundNumber(duration * $styles.scaleDurationRatio, 0),
          easing,
          roundNumber(duration * $styles.outScalingDelayRatioFromDuration, 0)
        ]
      ]);
      if (onEnter) onEnter(node);
    },
    [onEnter]
  );

  const enteredStyle = useMemo(() => {
    return {
      opacity: 1,
      transform: $styles.exitedScale
    };
  }, []);

  const exitedStyle = useMemo(() => {
    return {
      opacity: 0,
      transform: `scale(${$styles.scaleXRatio}, ${$styles.scaleYRatio})`
    };
  }, []);

  return (
    <Transition
      appear={appear}
      in={inProp}
      timeout={duration}
      onEnter={handleEnter}
      onExit={handleExit}
      {...props}
    >
      {(state, childProps) => {
        return (
          <DivElement
            style={
              state === 'entering' || state === 'entered'
                ? enteredStyle
                : exitedStyle
            }
            className={$names.ucGrow}
            {...childProps}
          >
            {children}
          </DivElement>
        );
      }}
    </Transition>
  );
};

export default Grow;
