import * as React from "react";
import { getComponentConstants } from "scripts";
import { isHorizontal } from "../Drawer/Drawer";
import { BaseElement } from "..";

const $ = getComponentConstants("swipeableDrawer");
const $swipeAreaStyle = $.styles.swipeArea;

type ComponentProps = {
  anchor?: $Type.Components.Drawer._Anchor;
  width?: number;
};

type Props = $Type.MergeObject<
  ComponentProps,
  $Type.Components.BaseElement._GeneralProps
>;

declare global {
  namespace $Type {
    namespace Components {
      namespace SwipeArea {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const SwipeArea: React.FC<Props> = ({
  children,
  anchor = "left",
  width = 40,
  ...other
}) => {
  const _style_ = React.useMemo(() => {
    return {
      ...$swipeAreaStyle.style,
      ...$swipeAreaStyle.anchor[anchor].style,
      [isHorizontal(anchor) ? "width" : "height"]: width
    };
  }, [anchor, width]);
  return (
    <BaseElement
      elementName="div"
      {...other}
      _style_={_style_}
      _className_={$.classNames.name}
    >
      {children}
    </BaseElement>
  );
};

export default SwipeArea;
