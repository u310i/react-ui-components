import React from 'react';
import { getComponentConstants } from 'scripts';
import { isHorizontal } from '../Drawer/Drawer';
import { BaseElement } from '..';

const $ = getComponentConstants('swipeableDrawer');

const $swipeAreaStyles = $.styles.swipeArea;
const $classNames = $.classNames

type Props = $Type.ReactUtils.CreateProps<
  {
    anchor?: $Type.Components.DrawerAnchor;
    width?: number;
  },
  typeof BaseElement
>;

const SwipeArea: $Type.ReactUtils.FunctionComponentWithoutChildren<Props> = ({
  anchor = 'left',
  width = 40,
  ...other
}) => {
  const _style_ = React.useMemo(() => {
    return {
      ...$swipeAreaStyles.style,
      ...$swipeAreaStyles[anchor].style,
      [isHorizontal(anchor) ? 'width' : 'height']: width,
    };
  }, [anchor, width]);
  return (
    <BaseElement
      elementName="div"
      _style_={_style_}
      _className_={$classNames.swipeableDrawerArea}
      {...other}
    />
  );
};

export default SwipeArea;
