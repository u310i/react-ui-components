import React, { useState, useEffect, useMemo, useRef } from 'react';
import './_materials';
import {
  isString,
  isArray,
  isReact,
  isReactComponent,
  deepMergeOverrideArray
} from 'scripts';

import {
  Button,
  Order,
  List,
  Divider,
  Icon,
  Fade,
  Collapse,
  Grow,
  Slide,
  Zoom,
  UlElement,
  LiElement,
  DivElement,
  SpanElement,
  AElement,
  ButtonElement,
  InputSubmitElement
} from 'components';
// import MuCollapse from '@material-ui/core/Collapse';

// createPageMaterials({
//   button: {
//     test: 'test'
//   }
// });

export default ({}) => {
  const [state, setState] = useState(true);
  const handler = () => {
    setState(prev => !prev);
  };
  return (
    <DivElement style={{ backgroundColor: '#fff' }}>
      <DivElement style={{ height: '100px' }} />
      <Button.Coordinator
        contents={[{ icon: 'sys-envelope' }, 'Download']}
        style={{ margin: '0.5em' }}
        type="fill"
        toFill
        onClick={handler}
      />
      <Zoom
        in={state}
        duration={{ enter: 2000, exit: 1000 }}
        appear={true}
        direction="left"
      >
        <DivElement
          style={{
            backgroundColor: '#ff00ff',
            width: '256px',
            height: '256px',
            // width: '100%',
            overflow: 'hidden',
            marginLeft: '100px'
          }}
          id="el"
        >
          aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
        </DivElement>
      </Zoom>
      {/* <MuCollapse in={state} timeout={1000}>
        <DivElement
          style={{
            backgroundColor: '#00ced1',
            width: '256px',
            height: '256px'
          }}
        >
          aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
        </DivElement>
      </MuCollapse> */}
      <List
        width="400px"
        space={1}
        levelStyle={[{ paddingLeft: '0.5em' }, { paddingLeft: '2.5em' }]}
      >
        <List.Group title="root-1" style={{ backgroundColor: '#ee82ee' }}>
          <List.Group title="group-1" style={{ backgroundColor: '#00fa9a' }}>
            <List.Item
              style={{
                backgroundColor: '#b0e0e6'
              }}
            >
              root-1_group-1_item1
            </List.Item>
            {/* <Divider /> */}
            <List.Item
              style={{
                backgroundColor: '#b0e0e6'
              }}
            >
              root-1_group-1_item2
            </List.Item>
            <List.Group title="group-2" style={{ backgroundColor: '#90ee90' }}>
              <List.Item
                style={{
                  backgroundColor: '#b0e0e6'
                }}
              >
                root-1_group-2_item1
              </List.Item>
              <List.Item
                style={{
                  backgroundColor: '#b0e0e6'
                }}
              >
                root-1_group-2_item2
              </List.Item>
            </List.Group>
          </List.Group>
        </List.Group>
        <List.Group title="root-2" style={{ backgroundColor: '#66cdaa' }}>
          <List.Item
            style={{
              backgroundColor: '#ffb6c1'
            }}
          >
            root-2_item1
          </List.Item>
        </List.Group>
        <List.Item
          style={{
            backgroundColor: '#ee82ee'
          }}
        >
          root_item
        </List.Item>
        <div>div</div>
        text
      </List>
      <Button.Coordinator
        contents={[
          [{ icon: 'sys-envelope' }, 'Aaaa'],
          [{ icon: 'sys-envelope' }, 'Bbbb'],
          [{ icon: 'sys-envelope' }, 'Cccc'],
          [{ icon: 'sys-envelope' }, 'Aaaa'],
          [{ icon: 'sys-envelope' }, 'Bbbb'],
          [{ icon: 'sys-envelope' }, 'Cccc']
        ]}
        group={{
          // between: '0.2em',
          childPropList: [
            { type: 'normal' },
            { type: 'dark-outline' },
            { type: 'outline' },
            { type: 'fill', disable: true },
            { type: 'outline', disable: true },
            { type: 'dark-outline', loading: true }
          ]
        }}
        shape="round"
        size=""
        type="normal"
      />
      <Icon
        type="fa"
        icon={['fab', 'apple']}
        size="2x"
        // flip="both"
        // border
        // rotation={90}
        // flip="horizontal"
        transform="translate(100 -200)  rotate(150 0 0)  scale(1 1.5)"
        className="aaaaaaaaaaaaaaaaaaaaaaaaaa"
      />
      <Icon
        type="fa"
        icon={['fab', 'apple']}
        size="2x"
        // flip="both"
        // pull="right"
      />
      aaaaaaaaaaa
      <Icon
        type="fa"
        icon={['fas', 'angle-double-left']}
        size="2x"
        // flip="both"
        // border
        // pull="right"
      />
      <Icon
        type="fa"
        icon={['fab', 'apple']}
        size="2x"
        // flip="both"
        border
      />
      <Icon
        type="fa"
        icon={['fab', 'apple']}
        size="2x"
        // flip="both"
        border={{ border: 'solid 0.12em #c71585' }}
        fixedWidth
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
