import React, { useState, useCallback, useRef, useMemo } from 'react';
import { css, cx } from 'react-emotion';

const FlexContainer = ({
  children,
  inline,
  direction,
  wrap,
  justifyContent,
  alignItems,
  alignContent,
  style: propStyle,
  firstStyle,
  lastStyle,
  nthStyle,
  className,
  defaultClassName
}) => {
  const style = {};
  style['display'] = inline ? 'inline-flex' : 'flex';
  if (direction) style['flexDirection'] = direction;
  if (wrap) style['flexWrap'] = flexWrap;
  if (justifyContent) style['justifyContent'] = justifyContent;
  if (alignItems) style['alignItems'] = alignItems;
  if (alignContent) style['alignContent'] = alignContent;

  const nthElStyle = {};
  if (nthStyle) {
    for (let [n, style] of nthStyle) {
      nthElStyle[`& > :nth-child(${n})`] = style;
    }
  }
  if (firstStyle) {
    nthElStyle['& > :first-child'] = firstStyle;
  }
  if (lastStyle) {
    nthElStyle['& > :last-child'] = lastStyle;
  }

  return (
    <div
      className={cx(
        css({ ...style, ...nthElStyle, ...propStyle }),
        defaultClassName,
        className
      )}
    >
      {children}
    </div>
  );
};

const Row = ({ children, ...props }) => {
  return (
    <FlexContainer defaultClassName="uc-flex-row" {...props}>
      {children}
    </FlexContainer>
  );
};

const Col = ({ children, direction = 'column', ...props }) => {
  return (
    <FlexContainer
      direction={direction}
      defaultClassName="uc-flex-col"
      {...props}
    >
      {children}
    </FlexContainer>
  );
};

const Item = ({
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
    <div
      className={cx(css({ ...style, ...propStyle }), 'uc-flex-item', className)}
    >
      {children}
    </div>
  );
};

const Flex = ({ children }) => {
  return children({ Row, Col, Item });
};

export { Row, Col, Item };
export default Flex;
