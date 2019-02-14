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
  className,
  initClassName = 'uc-flex'
}) => {
  const style = {};
  style['display'] = inline ? 'inline-flex' : 'flex';
  if (direction) style['flexDirection'] = direction;
  if (wrap) style['flexWrap'] = flexWrap;
  if (justifyContent) style['justifyContent'] = justifyContent;
  if (alignItems) style['alignItems'] = alignItems;
  if (alignContent) style['alignContent'] = alignContent;

  const childStyle = {};
  if (nthChildStyle) {
    for (let [n, style] of nthChildStyle) {
      childStyle[`& > :nth-child(${n})`] = style;
    }
  }
  if (firstChildStyle) {
    childStyle['& > :first-child'] = firstChildStyle;
  }
  if (lastChildStyle) {
    childStyle['& > :last-child'] = lastChildStyle;
  }

  return (
    <DivElement
      style={{ ...style, ...childStyle, ...propStyle }}
      classNames={[initClassName, className]}
    >
      {children}
    </DivElement>
  );
};

Flex.Row = ({ children, ...props }) => {
  return (
    <Flex initClassName="uc-flex-row" {...props}>
      {children}
    </Flex>
  );
};

Flex.Col = ({ children, direction = 'column', ...props }) => {
  return (
    <Flex direction={direction} initClassName="uc-flex-col" {...props}>
      {children}
    </Flex>
  );
};

Flex.Item = ({
  children,
  style: propStyle,
  className,
  order,
  flexGrow,
  flexShrink,
  flexBasis,
  alignSelf
}) => {
  const style = {};
  if (order) style['order'] = order;
  if (flexGrow) style['flexGrow'] = flexGrow;
  if (flexShrink) style['flexShrink'] = flexShrink;
  if (flexBasis) style['flexBasis'] = flexBasis;
  if (alignSelf) style['alignSelf'] = alignSelf;
  return (
    <DivElement
      style={{ ...style, ...propStyle }}
      classNames={['uc-flex-item', className]}
    >
      {children}
    </DivElement>
  );
};

export default Flex;
