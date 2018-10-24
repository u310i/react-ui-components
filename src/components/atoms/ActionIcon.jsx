import React from 'react';
import { css, cx } from 'react-emotion';

import Icon from 'atoms/Icon';

export default ({
  theme,
  containerProps: { className, styles, general, icon }
}) => {
  const componentStyle = {
    display: 'none',
    [theme.breakpoints.keys.sm]: {
      display: 'block',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      fontSize: '1.8rem',
      textAlign: 'center',
      backgroundColor: '#ff7f50'
      // lineHeight: '3'
    }
  };

  return (
    <button
      className={cx(className, css(general.styles, styles, componentStyle))}
    >
      <Icon theme={theme} containerProps={icon} />
    </button>
  );
};
