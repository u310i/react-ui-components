import React, { useMemo } from 'react';
import $ from './_materials';
import { genTransitionProp, genDurationsEasings } from 'scripts';
import { CSSTransition, DivElement } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const Fade = ({
  in: inProp,
  children,
  duration = $styles.duration,
  easing = $styles.easing,
  appear = true,
  onEnter,
  ...props
}) => {
  const [durations, easings] = genDurationsEasings(duration, easing);

  const style = useMemo(() => {
    return {
      opacity:
        !appear && inProp ? $styles.enteredOpacity : $styles.exitedOpacity,
      [$selectors.enters]: {
        transition: genTransitionProp([
          [$styles.transitionProperty, durations.enter, easings.enter]
        ]),
        opacity: $styles.exitedOpacity
      },
      [`${$selectors.enterings},${$selectors.entered}`]: {
        opacity: $styles.enteredOpacity
      },
      [$selectors.exit]: {
        transition: genTransitionProp([
          [$styles.transitionProperty, durations.exit, easings.exit]
        ]),
        opacity: $styles.enteredOpacity
      },
      [`${$selectors.exiting},${$selectors.exited}`]: {
        opacity: $styles.exitedOpacity
      },
      [$selectors.exited]: {
        visibility: $styles.exitedVisibility
      }
    };
  }, []);

  return (
    <CSSTransition appear={appear} in={inProp} timeout={durations} {...props}>
      {(state, childProps) => {
        return (
          <DivElement style={style} className={$names.ucFade} {...childProps}>
            {children}
          </DivElement>
        );
      }}
    </CSSTransition>
  );
};

export default Fade;
