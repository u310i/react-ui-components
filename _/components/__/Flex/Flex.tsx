import * as React from 'react';

import { BaseElement } from '..';

const Flex = ({
  children,
  inline,
  direction,
  wrap,
  justifyContent,
  alignItems,
  alignContent,
  style: propStyle,
  nthChildStyleList = [],
  firstChildStyle,
  lastChildStyle,
  notNthChildStyleList = [],
  notFirstChildStyle,
  notLastChildStyle,
  initClassName = 'uc-flex',
  ...other
}) => {
  const style = {};
  style.display = inline ? 'inline-flex' : 'flex';
  if (direction) style.flexDirection = direction;
  if (wrap) style.flexWrap = flexWrap;
  if (justifyContent) style.justifyContent = justifyContent;
  if (alignItems) style.alignItems = alignItems;
  if (alignContent) style.alignContent = alignContent;

  const nestedStyle = {};
  if (nthChildStyleList) {
    for (let [n, style] of nthChildStyleList) {
      nestedStyle[`& > :nth-child(${n})`] = style;
    }
  }
  if (firstChildStyle) {
    nestedStyle['& > :first-child'] = firstChildStyle;
  }
  if (lastChildStyle) {
    nestedStyle['& > :last-child'] = lastChildStyle;
  }
  if (notNthChildStyleList) {
    for (let [n, style] of notNthChildStyleList) {
      nestedStyle[`& > :not(:nth-child(${n}))`] = style;
    }
  }
  if (notFirstChildStyle) {
    nestedStyle['& > :not(:first-child)'] = notFirstChildStyle;
  }
  if (notLastChildStyle) {
    nestedStyle['& > :not(:last-child)'] = notLastChildStyle;
  }

  return (
    <BaseElement style={{ ...style, ...nestedStyle, ...propStyle }} {...other}>
      {children}
    </BaseElement>
  );
};

Flex.Row = ({ children, ...other }) => {
  return (
    <BaseElement classNames={['uc-flex-row']} {...other}>
      {children}
    </BaseElement>
  );
};

Flex.Col = ({ children, direction = 'column', ...other }) => {
  return (
    <BaseElement direction={direction} classNames={['uc-flex-col']} {...other}>
      {children}
    </BaseElement>
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
  ...other
}) => {
  const style = {};
  if (order) style.order = order;
  if (flexGrow) style.flexGrow = flexGrow;
  if (flexShrink) style.flexShrink = flexShrink;
  if (flexBasis) style.flexBasis = flexBasis;
  if (alignSelf) style.alignSelf = alignSelf;
  return (
    <BaseElement
      elementName="div"
      style={{ ...style, ...propStyle }}
      classNames={['uc-flex-item']}
      {...other}
    >
      {children}
    </BaseElement>
  );
};

export default Flex;
