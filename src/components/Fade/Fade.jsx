import React, { useMemo, useCallback, useRef } from 'react';
import $materials from './_materials';
import { reflow } from 'scripts';
import { Transition } from 'react-transition-group';
import { DivElement } from 'elements';

const $names = $materials.names;
const $styles = $materials.styles;

const Fade = ({
  in: inProp,
  children,
  duration = $styles.defaultDuration,
  easing = $styles.defaultEasing,
  appear = true,
  onEnter,
  ...props
}) => {
  const style = useMemo(() => {
    return {
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: easing,
      transitionProperty: $styles.transitionProperty
    };
  }, []);

  const handleEnter = useCallback(
    node => {
      reflow(node);
      if (onEnter) onEnter(node);
    },
    [onEnter]
  );

  return (
    <Transition
      appear={appear}
      in={inProp}
      timeout={duration}
      onEnter={handleEnter}
      {...props}
    >
      {(state, childProps) => {
        return (
          <DivElement
            style={{
              ...style,
              opacity:
                state === 'entering' || state === 'entered'
                  ? $styles.enteredOpacity
                  : $styles.exitedOpacity,
              visibility:
                state === 'exited' && !inProp
                  ? $styles.exitedVisibility
                  : undefined
            }}
            className={$names.ucFade}
            {...childProps}
          >
            {children}
          </DivElement>
        );
      }}
    </Transition>
  );
};

export default Fade;
