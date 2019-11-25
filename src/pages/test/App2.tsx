import * as React from "react";
import "./_constants";
// import {} from 'scripts';

import {
  BaseElement,
  Button,
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
  SwipeableDrawer
} from "components";
// import { FocusOn } from 'react-focus-on';

let index = 0;

const App = ({}) => {
  index += 1;
  console.log("-----------------------------" + index);
  return (
    <BaseElement
      elementName="div"
      className="contents"
      id="contents"
      style={
        {
          "& > div": {
            marginTop: "10px"
          }
        } as any
      }
    >
      <BaseElement elementName="div" style={{ height: "30px" }}>
        app2
      </BaseElement>
      <BaseElement
        elementName="div"
        style={
          {
            display: "flex",
            "& > :not(:first-child)": { marginLeft: "20px" }
          } as any
        }
      >
        <Button disabled={false}>New Button</Button>
        <Button disabled>New Button</Button>
        <Button ariaDisabled disabled={false}>
          New Button
        </Button>
      </BaseElement>
      {/* <ButtonCoordinator
        contents={[
          [{ icon: "sys-envelope" }, "Aaaa"],
          [{ icon: "sys-envelope" }, "Bbbb"],
          [{ icon: "sys-envelope" }, "Cccc"]
        ]}
        group={{
          // between: '0.2em',
          childPropList: [
            { type: "normal" },
            { type: "dark-outline" },
            { type: "outline" }
          ]
        }}
        shape="round"
        size=""
        type="normal"
      /> */}
    </BaseElement>
  );
};

export default App;
