import React from 'react';
import { css, cx } from 'react-emotion';

import Icon from 'atoms/Icon';

export default ({ theme, containerProps: { container, general }, toggle }) => {
  const { style, icon } = container;
  const componentStyle = {
    display: 'none',
    [theme.breakpoint.createMediaQuerie('maxWidth', 'sm')]: {
      display: 'block',
      paddingTop: '0rem',
      paddingBottom: '0rem',
      paddingLeft: '0rem',
      paddingRight: '0.5rem',
      '& > button': {
        fontSize: '1.5rem',
        backgroundColor: '#ff7f50',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem'
      }
    }
  };

  return (
    <div
      css={{
        ...general.style,
        ...style,
        ...componentStyle
      }}
    >
      <button onClick={toggle}>
        <Icon theme={theme} containerProps={icon} />
      </button>
    </div>
  );
};
