import React, { useState, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  genSimpleTransitionStyle,
  assignTransitionDuration
} from 'utilities/styleUtils';
import { getDisplayStateOnScrollEvent } from 'utilities/windowEvents';
import { useAddWindowEvent } from 'utilities/hooks/useEffects';

const name = 'scrollDown';

const ScrollDown = ({
  enable,
  innerHoc,
  keepHeight,
  style: propStyle,
  isBottom,
  duration = 200,
  timingFunction = 'ease-out',
  options: {
    preset = 'hide',
    style: { beforeStyle = {}, afterStyle = {} }
  }
}) => {
  const [displayState, setDisplayState] = useState('show');
  useAddWindowEvent(
    'scroll',
    () =>
      getDisplayStateOnScrollEvent(!isBottom && keepHeight, state => {
        setDisplayState(state);
      }),
    enable,
    [enable]
  );

  const tsStyle = useMemo(() => {
    let presetBeforeStyle = {};
    let presetAfterStyle = {};
    if (preset === 'hide') {
      presetBeforeStyle = {
        transform: `translate3d(0, 0, 0)`
      };
      presetAfterStyle = {
        transform: `translate3d(0, ${isBottom ? '100%' : '-100%'}, 0)`
      };
    }

    return genSimpleTransitionStyle(
      name,
      {
        beforeStyle: { ...presetBeforeStyle, ...beforeStyle },
        afterStyle: { ...presetAfterStyle, ...afterStyle },
        baseStyle: propStyle
      },
      duration,
      timingFunction
    );
  }, []);

  let tsDurationStyle = {};
  if (displayState === 'ignore' || !enable) {
    tsDurationStyle = assignTransitionDuration(name, tsStyle, 0);
  }
  const style = {
    ...propStyle,
    ...tsStyle,
    ...tsDurationStyle
  };

  const transitionProps = {
    in: enable && displayState === 'hide',
    timeout: duration,
    classNames: name
  };

  return <CSSTransition {...transitionProps}>{innerHoc(style)}</CSSTransition>;
};

export default ScrollDown;
