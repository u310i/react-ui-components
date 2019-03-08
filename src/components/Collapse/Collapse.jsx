import React, { useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { DivElement } from 'elements';

const Collapse = (open, duration, timingFunction) => {
  transitionStyle;
  return (
    <CSSTransition in={open} timeout={duration}>
      <DivElement>{children}</DivElement>
    </CSSTransition>
  );
};

export default Collapse;
