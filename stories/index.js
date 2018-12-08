import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';

// import Drawer from 'molecules/Drawer';

storiesOf('Button', module)
  .add('with text', () => <Button>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

// storiesOf('Drawer', module).add('drawer', () => {
//   const { drawer: options, list } = drawerArg;
//   return (
//     <Drawer
//       options={options}
//       list={list}
//       onClose={onClose}
//       state={drawerState}
//     />
//   );
// });

// const drawerArg = {
//   drawer: {
//     style: {},
//     direction: 'left',
//     duration: 150,
//     timingFunction: 'ease-out',
//     closable: true,
//     buttonIcon: 'times',
//     buttonStyle: {},
//     mask: true,
//     maskClosable: true,
//     maskOpacity: 0.3,
//     maskStyle: {
//       backgroundColor: 'white'
//     },
//     shiftScrollBarWidth: true,
//     width: '400px',
//     height: '100%',
//     zIndex: theme.zIndex.drawer
//   },
//   list: [
//     {
//       text: 'TOP',
//       attribute: { href: '#' },
//       style: {
//         backgroundColor: '#4CAF50',
//         color: 'white'
//       }
//     },
//     {
//       text: 'VISION',
//       attribute: { href: '#' }
//     },
//     {
//       text: 'MESSAGE',
//       attribute: { href: '#' }
//     },
//     {
//       text: 'STORY',
//       attribute: { href: '#' }
//     },
//     {
//       text: 'PROFILE',
//       attribute: { href: '#' }
//     }
//   ]
// };
