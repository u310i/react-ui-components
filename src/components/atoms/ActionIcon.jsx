import React from 'react';
import { css, cx } from 'react-emotion';

import Icon from 'atoms/Icon';

export default ({ theme, containerProps: { container, general }, toggle }) => {
  const { styles, icon } = container;
  const componentStyle = {
    display: 'none',
    [theme.breakpoints.maxWidthPresets.sm]: {
      zIndex: theme.zIndex.drawer + 99,
      display: 'block',
      alignSelf: 'stretch',
      padding: '0rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      fontSize: '1.5rem',
      backgroundColor: '#ff7f50'
    }
  };

  return (
    <button
      css={{
        ...general.styles,
        ...styles,
        ...componentStyle
      }}
      onClick={toggle}
    >
      <Icon theme={theme} containerProps={icon} />
    </button>
  );
};
