import * as React from 'react';
import './_constants';
// import {} from 'scripts';

import {
  BaseElement,
  Button,
  Button2,
  ButtonCoordinator,
  // List,
  Icon,
  Fade,
  Collapse,
  Grow,
  Slide,
  Zoom,
  Sticky,
  Paper,
  Modal,
  Backdrop,
  Dialog,
  Drawer,
  SwipeableDrawer,
} from 'components';
// import { FocusOn } from 'react-focus-on';

let index = 0;

const App = ({}) => {
  index += 1;
  console.log('-----------------------------' + index);
  return (
    <BaseElement elementName="div">
      <BaseElement elementName="div">app2</BaseElement>
      <Button type="fill">Button</Button>
      <Button2>Button</Button2>
    </BaseElement>
  );
};

export default App;
