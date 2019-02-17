import React from 'react';
import { isString } from 'utilities';
import { DivElement } from 'components/_Elements';

const Group = ({
  children,
  style: propStyle,
  nthChildStyleList = [],
  firstChildStyle = {},
  lastChildStyle = {},
  notNthChildStyleList = [],
  notFirstChildStyle = {},
  notLastChildStyle = {},
  between
}) => {
  const nestedStyle = {};
  nestedStyle['& > :first-child'] = {
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    ...firstChildStyle
  };
  nestedStyle['& > :last-child'] = {
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    ...lastChildStyle
  };

  const betweenStyle = between
    ? { marginLeft: isString(between) ? between : '0.2em' }
    : { borderLeftColor: 'rgba(255, 255, 255, 0)' };

  nestedStyle['& > :not(:first-child)'] = {
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    ...betweenStyle,
    ['&:hover']: {
      borderLeftStyle: 'solid'
    },
    ...notFirstChildStyle
  };
  nestedStyle['& > :not(:last-child)'] = {
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    ...notLastChildStyle
  };
  if (nthChildStyleList) {
    for (let [n, style] of nthChildStyleList) {
      nestedStyle[`& > :nth-child(${n})`] = style;
    }
  }
  if (notNthChildStyleList) {
    for (let [n, style] of notNthChildStyleList) {
      nestedStyle[`& > :not(:nth-child(${n}))`] = style;
    }
  }
  return (
    <DivElement
      style={{ ...propStyle, ...nestedStyle }}
      classNames={['uc-button-group']}
    >
      {children}
    </DivElement>
  );
};

export default Group;
