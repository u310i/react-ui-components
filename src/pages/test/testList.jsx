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
import { Button } from 'components';

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
  { className: css({ backgroundColor: '#ff7f50' }) },
  { className: css({ backgroundColor: '#dc143c' }) },
  { className: css({ backgroundColor: '#ff1493' }) }
];
check.array(propList);

export default ({}) => {
  const color = '#1890ff';
  const color2 = '#ff4500';
  const [state, setState] = useState(color);
  const onClick = () => {
    setState(color2);
  };
  return (
    <List style={{ padding: '1em' }}>
      {/* <Button>
        <Icon icon="sys-envelope" size="sm" />
      </Button> */}
      <Order list={propList}>
        {props => <DivElement {...props}>order</DivElement>}
      </Order>
      <DivElement style={{ backgroundColor: 'white', margin: '1em' }}>
        <Button.Group>
          <Button.Coordinator
            contents={[{ icon: 'sys-envelope' }, 'Download']}
            color={state}
            size="lg"
            type="outline"
            onClick={onClick}
          />
          <Button.Coordinator
            contents={[{ icon: 'sys-envelope' }, 'Download']}
            color={state}
            size="lg"
            type="outline"
            onClick={onClick}
          />
          <Button.Coordinator
            contents={[{ icon: 'sys-envelope' }, 'Download']}
            color={state}
            size="lg"
            type="outline"
            onClick={onClick}
          />
        </Button.Group>
      </DivElement>

      {/* <DivElement style={{ backgroundColor: 'white' }}>
        <Button.Coordinator
          contents={[{ icon: 'sys-envelope' }, 'Download']}
          style={{ margin: '0.5em' }}
          color={state}
          size="lg"
          type="dark"
          onClick={onClick}
        />
        <Button.Coordinator
          contents={[{ icon: 'sys-envelope' }, 'Download']}
          style={{ margin: '0.5em' }}
          color={state}
          size="lg"
          type="dark-outline"
        />
        <Button.Coordinator
          contents={[{ icon: 'sys-envelope' }, 'Download']}
          style={{ margin: '0.5em' }}
          color={state}
          size="lg"
          type="normal"
        />
        <Button.Coordinator
          contents={[{ icon: 'sys-envelope' }, 'Download']}
          style={{ margin: '0.5em' }}
          color={state}
          size="lg"
          type="normal-outline"
        />
        <Button.Coordinator
          contents={[{ icon: 'sys-envelope' }, 'Download']}
          style={{ margin: '0.5em' }}
          color={state}
          size="lg"
          type="outline"
        />
        <Button.Coordinator
          contents={[{ icon: 'sys-envelope' }, 'Download']}
          style={{ margin: '0.5em' }}
          color={state}
          size="lg"
          type="fill"
        />
      </DivElement> */}

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

{
  /* <Button.Coordinator
contents={[{ icon: 'sys-envelope' }, 'Download']}
style={{ marginBottom: '1em', marginTop: '1em' }}
size="3x"
ghost
onClick={onClick}
color={state}
/>
<Button.Coordinator
contents={[{ icon: 'sys-envelope' }, 'Download']}
style={{ marginBottom: '1em', marginTop: '1em' }}
size="3x"
color={state}
/>
<DivElement style={{ height: '4em', backgroundColor: 'green' }}>
<Button.Coordinator
  contents={[{ icon: 'sys-envelope' }, 'Download']}
  style={{ marginBottom: '1em' }}
  shape="corner"
  fullHeight
  color={state}
/>
</DivElement>

<Button.Coordinator
contents={[{ icon: 'sys-envelope' }, 'Download']}
shape="round"
size="2x"
borderStyle="dashed"
borderWidth="1.8px"
disable
color={state}
/>
<Button.Coordinator
contents={['Download']}
shape="round"
size="2x"
loading
color={state}
/>
<Button.Coordinator
contents={['ロード中', 'ロード中']}
shape="round"
size="2x"
loading
disable
color={state}
/>
<Button.Coordinator
contents={[{ icon: 'sys-envelope' }]}
shape="circle"
size="3x"
loading
color={state}
/>
<Button.Coordinator
contents={[{ icon: 'sys-envelope' }]}
shape="circle"
size="3x"
/> */
}
