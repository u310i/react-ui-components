import React from 'react';
import { css, cx } from 'react-emotion';

import List from 'atoms/List';

const AppBar = ({
  parentRef = null,
  parentProps = {},
  list = [],
  theme,
  options = {}
}) => {
  const { style: parentStyle = {} } = parentProps;
  const { style: propStyle = {}, height = '3rem' } = options;

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
      zIndex: theme.zIndex.appBar
    }
  };

  const componentStyleRoot = {
    ...componentStyle.style,
    ...parentStyle,
    ...propStyle
  };

  return (
    <div ref={parentRef} className={cx(css(componentStyleRoot), 'uc-appbar')}>
      <List componentList={list} mode="component" />
    </div>
  );
};

export default AppBar;
