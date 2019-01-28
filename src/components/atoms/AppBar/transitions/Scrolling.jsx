import React, { useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';

import { genSimpleTransitionStyle } from 'utilities/styleUtils';

const name = 'scrolling';

const Scrolling = ({
  enable,
  innerHoc,
  style: propStyle,
  duration = 200,
  timingFunction = 'ease-out',
  options: {
    style: { beforeStyle = {}, afterStyle = {} }
  }
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

  const transitionProps = {
    in: enable,
    timeout: duration,
    classNames: name
  };

  return <CSSTransition {...transitionProps}>{innerHoc(style)}</CSSTransition>;
};

export default Scrolling;
