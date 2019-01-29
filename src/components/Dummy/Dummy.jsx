import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { css, cx } from 'emotion';

const Dummy = ({ container, style: propStyle, className }) => {
  const componentStyle = useMemo(() => {
    return {
      opacity: '0',
      width: '100%'
    };
  }, []);

  const Component = (
    <div className={cx(css({ ...componentStyle, ...propStyle }), className)} />
  );

  return container ? ReactDOM.createPortal(Component, container) : Component;
};

export default Dummy;
