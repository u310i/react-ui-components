import React, { useState, useEffect, useMemo, useRef } from 'react';
import Icon from 'components/Icon';
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
import { Button, Order, List } from 'components';

export default ({}) => {
  return (
    <DivElement style={{ backgroundColor: '#00bfff' }}>
      <List>
        <List.Group
          title="Navigation One"
          style={{ backgroundColor: '#ee82ee', padding: '1em 0' }}
        >
          <List.Group
            title="Item 1"
            style={{ backgroundColor: '#00fa9a', padding: '1em 0' }}
          >
            <LiElement
              style={{
                backgroundColor: '#ffdead',
                padding: '0.5em 1.5rem'
              }}
            >
              Option 1
            </LiElement>
            <LiElement
              style={{
                backgroundColor: '#b0e0e6',
                padding: '0.5em 1.5rem'
              }}
            >
              Option 2
            </LiElement>
          </List.Group>
        </List.Group>
      </List>
    </DivElement>
  );
};

// const entries = [
//   [{ style: { backgroundColor: '#dc143c', padding: '1em 0px' } }, 'aaa'],
//   [{ style: { backgroundColor: '#ff7f50', padding: '1em 0px' } }, 'bbb'],
//   [{ style: { backgroundColor: '#ff1493', padding: '1em 0px' } }, 'ccc']
// ];

{
  /* <DivElement style={{ padding: '1em' }}>
<Order list={entries}>
  {({ props, child }) => <DivElement {...props}>{child}</DivElement>}
</Order>
</DivElement> */
}

{
  /* <DivElement style={{ padding: '1em' }}>
<DivElement style={{ padding: '1em', backgroundColor: '#f0f8ff' }}>
  <List>
    <List.Item>aaa</List.Item>
    <List.Item>bbb</List.Item>
    <List.Item>ccc</List.Item>
  </List>
</DivElement> */
}

// const color = '#1890ff';
// const color2 = '#ff4500';
// const [state, setState] = useState(color);
// const onClick = () => {
//   setState(color2);
// };

{
  /* <DivElement style={{ backgroundColor: 'white', margin: '1em' }}>
<Button.Coordinator
  contents={[
    [{ icon: 'sys-envelope' }, 'Aaaa'],
    [{ icon: 'sys-envelope' }, 'Bbbb'],
    [{ icon: 'sys-envelope' }, 'Cccc']
  ]}
  group={{
    between: '0.2em',
    childPropList: [, { disable: true }, { loading: true }]
  }}
  shape="round"
  color={state}
  size=""
  type="normal"
  onClick={onClick}
/>
</DivElement>

<DivElement style={{ backgroundColor: 'white' }}>
<Button.Coordinator
  contents={[{ icon: 'sys-envelope' }, 'Download']}
  style={{ margin: '0.5em' }}
  color={state}
  size="lg"
  type="fill"
  toFill
  shape="round"
/>
</DivElement> */
}
