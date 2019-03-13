import React, { useMemo, useCallback } from 'react';
import materials from './_materials';
import { reflow, roundNumber, genTransitionProp } from 'scripts';
import { Transition } from 'react-transition-group';
import { DivElement } from 'elements';

const mNames = materials.names;
const mStyles = materials.styles;

const Grow = ({
  in: inProp,
  children,
  duration = mStyles.defaultDuration,
  easing = mStyles.defaultEasing,
  appear = true,
  onEnter,
  ...props
}) => {
  const handleEnter = useCallback(
    node => {
      reflow(node);
      node.style.transition = genTransitionProp([
        [mStyles.transitionOpacity, duration, easing],
        [
          mStyles.transitionTransform,
          roundNumber(duration * mStyles.scaleDurationRatio, 0),
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
        [mStyles.transitionOpacity, duration, easing],
        [
          mStyles.transitionTransform,
          roundNumber(duration * mStyles.scaleDurationRatio, 0),
          easing,
          roundNumber(duration * mStyles.outScalingDelayRatioFromDuration, 0)
        ]
      ]);
      if (onEnter) onEnter(node);
    },
    [onEnter]
  );

  const enteredStyle = useMemo(() => {
    return {
      opacity: 1,
      transform: mStyles.exitedScale
    };
  }, []);

  const exitedStyle = useMemo(() => {
    return {
      opacity: 0,
      transform: `scale(${mStyles.scaleXRatio}, ${mStyles.scaleYRatio})`
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
            className={mNames.ucGrow}
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
