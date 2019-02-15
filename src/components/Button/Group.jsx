import React, { useCallback, useMemo } from 'react';
import { isString, isObject } from 'utilities';
import { ButtonElement, DivElement } from 'components/_Elements';

const Group = ({ children }) => {
  const nestedStyle = {};
  nestedStyle['& > :first-child'] = {
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px'
  };
  nestedStyle['& > :last-child'] = {
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px'
  };
  nestedStyle['& > :not(:first-child)'] = {
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    borderLeftColor: 'rgba(255,255,255,0.3)'
  };
  nestedStyle['& > :not(:last-child)'] = {
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    borderRightStyle: 'none'
  };
  console.log(children);
  return <DivElement style={{ ...nestedStyle }}>{children}</DivElement>;
};

export default Group;
