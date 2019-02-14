import React, { useState, useEffect, useMemo, useRef } from 'react';
import { css, cx } from 'react-emotion';
import Icon from 'components/Icon';
import check from 'check-types';
import {
  isString,
  isArray,
  isReact,
  isReactComponent
} from 'utilities/checkTypes';

import {
  UlElement,
  LiElement,
  DivElement,
  AElement,
  ButtonElement,
  InputSubmitElement
} from 'components/_Elements';
import Button from 'components/Button';

const List = ({ children, style }) => {
  return (
    <UlElement style={style} classNames={['uc-list']}>
      {children}
    </UlElement>
  );
};

List.Item = ({ children, style }) => {
  return (
    <LiElement style={style} classNames={['uc-list-item']}>
      {children}
    </LiElement>
  );
};

export const Order = ({ children, list: propList }) => {
  const list = propList.map(({ key: propKey, ...props }, index) => {
    const key = propKey || index;
    return children({ key, ...props });
  });
  return list;
};

const propList = [
  { className: css({ backgroundColor: '#ff7f50' }), key: 'aaa' },
  { className: css({ backgroundColor: '#dc143c' }), key: 'bbb' },
  { className: css({ backgroundColor: '#ff1493' }), key: 'ccc' }
];
check.array(propList);

export default ({}) => {
  const onClick = () => {
    console.log('click');
  };
  return (
    <List style={{ padding: '1em' }}>
      {/* <Button>
        <Icon icon="sys-envelope" size="sm" />
      </Button> */}
      <Order list={propList}>
        {props => <DivElement {...props}>order</DivElement>}
      </Order>

      <Button
        style={{ marginBottom: '1em', marginTop: '1em' }}
        size="3x"
        ghost
        onClick={onClick}
        color="#008b8b"
      >
        <Icon icon="sys-envelope" />
        Download
      </Button>
      <Button
        style={{ marginBottom: '1em', marginTop: '1em' }}
        size="3x"
        color="#008b8b"
      >
        <Icon icon="sys-envelope" />
        Download
      </Button>
      <DivElement style={{ height: '4em', backgroundColor: 'green' }}>
        <Button
          style={{ marginBottom: '1em' }}
          shape="corner"
          fullHeight
          color="#008b8b"
        >
          <Icon icon="sys-envelope" />
          Download
        </Button>
      </DivElement>

      <Button
        shape="round"
        size="2x"
        borderStyle="dashed"
        borderWidth="1.8px"
        disable
        color="#008b8b"
      >
        <Icon icon="sys-envelope" />
        Download
      </Button>
      <Button shape="round" size="2x" loading color="#008b8b">
        Download
      </Button>
      <Button shape="round" size="2x" loading disable color="#008b8b">
        <span>ロード中</span>
        <span>ロード中</span>
      </Button>
      <Button shape="circle" size="3x" loading color="#008b8b">
        <Icon icon="sys-envelope" />
      </Button>
      <Button shape="circle" size="3x">
        <Icon icon="sys-envelope" />
      </Button>
      <Order list={propList}>
        {props => <DivElement {...props}>order</DivElement>}
      </Order>
      <List.Item>test</List.Item>
      <List.Item>test</List.Item>
      <List.Item>
        <Icon
          icon="sys-envelope"
          size="sm"
          marginRight={'1em'}
          marginLeft
          aria-hidden={true}
        />
        TEST
      </List.Item>
      <AElement href="#">絶対パスでリンクします</AElement>
      <AElement href="http://www.htmq.com/style/vertical-align.shtml">
        絶対パスでリンクします
      </AElement>
      <InputSubmitElement value="Submity" />
      <ButtonElement>ButtonElement</ButtonElement>
      <Icon icon="sys-envelope" spin />
      <Icon icon="sys-envelope" pulse />
      <Icon icon="sys-envelope" spin />
    </List>
  );
};
// {
//   if (nthChildStyle) {
//     for (let [n, style] of nthChildStyle) {
//       childStyle[`& > :nth-child(${n})`] = style;
//     }
//   }
//   if (firstChildStyle) {
//     childStyle['& > :first-child'] = firstChildStyle;
//   }
//   if (lastChildStyle) {
//     childStyle['& > :last-child'] = lastChildStyle;
//   }

//   if (children.length >= 2 && firstChildRightSpace) {
//     const marginRight = isString(firstChildRightSpace)
//       ? firstChildRightSpace
//       : '0.5em';
//     if (!childStyle['& > :first-child']) {
//       childStyle['& > :first-child'] = {};
//     }
//     childStyle['& > :first-child'].marginRight = marginRight;
//   }

//   if (children.length >= 3 && lastChildLeftSpace) {
//     const marginLeft = isString(lastChildLeftSpace)
//       ? lastChildLeftSpace
//       : '0.5em';
//     if (!childStyle['& > :last-child']) {
//       childStyle['& > :last-child'] = {};
//     }
//     childStyle['& > :last-child'].marginLeft = marginLeft;
//   }
// }
