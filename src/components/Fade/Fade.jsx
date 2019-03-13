import React, { useMemo, useCallback, useRef } from 'react';
import materials from './_materials';
import { reflow } from 'scripts';
import { Transition } from 'react-transition-group';
import { DivElement } from 'elements';

const mNames = materials.names;
const mStyles = materials.styles;

const Fade = ({
  in: inProp,
  children,
  duration = mStyles.defaultDuration,
  easing = mStyles.defaultEasing,
  appear = true,
  onEnter,
  ...props
}) => {
  const style = useMemo(() => {
    return {
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: easing,
      transitionProperty: mStyles.transitionProperty
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
                  ? mStyles.enteredOpacity
                  : mStyles.exitedOpacity,
              visibility:
                state === 'exited' && !inProp
                  ? mStyles.exitedVisibility
                  : undefined
            }}
            className={mNames.ucFade}
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
