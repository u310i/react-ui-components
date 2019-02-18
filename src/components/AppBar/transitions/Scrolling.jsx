import React, { useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';

import { genSimpleTransitionStyle } from 'scripts';

const name = 'scrolling';

const Scrolling = ({
  enable,
  innerHoc,
  style: propStyle,
  duration = 200,
  timingFunction = 'ease-out',
  beforeStyle = {},
  afterStyle = {}
}) => {
  const tsStyle = useMemo(() => {
    return genSimpleTransitionStyle(
      name,
      {
        beforeStyle: beforeStyle,
        afterStyle: afterStyle,
        baseStyle: propStyle
      },
      duration,
      timingFunction
    );
  }, []);

  const style = {
    ...propStyle,
    ...tsStyle
  };

  return (
    <CSSTransition in={enable} timeout={duration} classNames={name}>
      {innerHoc(style)}
    </CSSTransition>
  );
};

export default Scrolling;
