import React, { useState, useCallback, useRef, useMemo } from 'react';
import { css, cx } from 'react-emotion';

const AppBar = ({
  propRef = null,
  parent = {},
  children = '',
  theme,
  options = {}
}) => {
  const { style: parentStyle = {} } = parent;
  const {
    style: propStyle = {},
    height = '3rem',
    position = 'static',
    top = options.position === 'static' ? 'auto' : '0'
  } = options;
  const componentStyle = {
    style: {
      backgroundColor: '#333',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: height,
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      width: '100%',
      zIndex: theme.zIndex.appBar,
      position: position,
      top: position === 'static' ? 'auto' : top || '0',
      left: position === 'static' ? 'auto' : '0'
    }
  };

  return (
    <div
      ref={propRef}
      className={cx(
        css({
          ...componentStyle.style,
          ...parentStyle,
          ...propStyle
        }),
        'uc-appbar'
      )}
    >
      {children || ''}
    </div>
  );
};

export default AppBar;
