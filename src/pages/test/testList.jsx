import React, { useState, useEffect, useMemo, useRef } from 'react';
import { isString, isArray, isReact, isReactComponent } from 'scripts';

import {
  UlElement,
  LiElement,
  DivElement,
  SpanElement,
  AElement,
  ButtonElement,
  InputSubmitElement
} from 'elements';
import { Button, Order, List, Divider } from 'components';
// import Theme from 'components/Theme';

export default ({}) => {
  return (
    <DivElement style={{ backgroundColor: '#00bfff' }}>
      <List>
        <List.Group
          title="Navigation One"
          style={{ backgroundColor: '#ee82ee' }}
        >
          <List.Group title="Item 1" style={{ backgroundColor: '#00fa9a' }}>
            <List.Item
              style={{
                backgroundColor: '#ffdead'
              }}
            >
              Option 1
            </List.Item>
            {/* <Divider /> */}
            <List.Item
              style={{
                backgroundColor: '#b0e0e6'
              }}
            >
              Option 2
            </List.Item>
          </List.Group>
        </List.Group>
      </List>
      <Button.Coordinator
        contents={[
          [{ icon: 'sys-envelope' }, 'Aaaa'],
          [{ icon: 'sys-envelope' }, 'Bbbb'],
          [{ icon: 'sys-envelope' }, 'Cccc']
        ]}
        group={{
          style: {
            margin: '1em'
          }
        }}
        shape="round"
        color={'#b0e0e6'}
        // size="lg"
        type="normal"
      />
    </DivElement>
  );
};

{
  /* <Button.Coordinator
contents={[
  [{ icon: 'sys-envelope' }, 'Aaaa'],
  [{ icon: 'sys-envelope' }, 'Bbbb'],
  [{ icon: 'sys-envelope' }, 'Cccc']
]}
group={{
  style: {
    margin: '1em'
  }
}}
shape="round"
color={'#b0e0e6'}
size="lg"
type="normal"
/> */
}

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
