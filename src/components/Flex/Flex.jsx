import React from 'react';

import { DivElement } from 'components/_Elements';

const Flex = ({
  children,
  inline,
  direction,
  wrap,
  justifyContent,
  alignItems,
  alignContent,
  style: propStyle,
  firstChildStyle,
  lastChildStyle,
  nthChildStyle,
  initClassName = 'uc-flex',
  ...props
}) => {
  const style = {};
  style.display = inline ? 'inline-flex' : 'flex';
  if (direction) style.flexDirection = direction;
  if (wrap) style.flexWrap = flexWrap;
  if (justifyContent) style.justifyContent = justifyContent;
  if (alignItems) style.alignItems = alignItems;
  if (alignContent) style.alignContent = alignContent;

  const nestedStyle = {};
  if (nthChildStyle) {
    for (let [n, style] of nthChildStyle) {
      nestedStyle[`& > :nth-child(${n})`] = style;
    }
  }
  if (firstChildStyle) {
    nestedStyle['& > :first-child'] = firstChildStyle;
  }
  if (lastChildStyle) {
    nestedStyle['& > :last-child'] = lastChildStyle;
  }

  return (
    <DivElement style={{ ...style, ...nestedStyle, ...propStyle }} {...props}>
      {children}
    </DivElement>
  );
};

Flex.Row = ({ children, ...props }) => {
  return (
    <Flex classNames={['uc-flex-row']} {...props}>
      {children}
    </Flex>
  );
};

Flex.Col = ({ children, direction = 'column', ...props }) => {
  return (
    <Flex direction={direction} classNames={['uc-flex-col']} {...props}>
      {children}
    </Flex>
  );
};

Flex.Item = ({
  children,
  style: propStyle,
  order,
  flexGrow,
  flexShrink,
  flexBasis,
  alignSelf,
  ...props
}) => {
  const style = {};
  if (order) style.order = order;
  if (flexGrow) style.flexGrow = flexGrow;
  if (flexShrink) style.flexShrink = flexShrink;
  if (flexBasis) style.flexBasis = flexBasis;
  if (alignSelf) style.alignSelf = alignSelf;
  return (
    <DivElement
      style={{ ...style, ...propStyle }}
      classNames={['uc-flex-item']}
      {...props}
    >
      {children}
    </DivElement>
  );
};

export default Flex;
