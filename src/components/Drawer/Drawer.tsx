import React from 'react';
import $ from './_constants';
import { Modal, Slide, Paper } from '..';

const $classNames = $.classNames;
const $styles = $.styles;
const $modalContentStyle = $styles.modal.contents;
const $transitionStyle = $styles.transition;
const $innerStyle = $styles.inner;

type Anchor = 'left' | 'right' | 'top' | 'bottom';

declare global {
  namespace $Type {
    namespace Components {
      type DrawerAnchor = Anchor;
    }
  }
}

export const isHorizontal = (anchor: Anchor): boolean => {
  return ['left', 'right'].indexOf(anchor) !== -1;
};

const slideDirections = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up',
} as const;

export const getSlideDirections = (
  anchor: Anchor
): $Type.Components.SlideDirection => {
  return slideDirections[anchor];
};

type Props = $Type.ReactUtils.CreateProps<
  {
    open?: boolean;
    anchor?: Anchor;
    TransitionComponent?: React.FC<
      $Type.Transition.PropTransitionComponentCommonProps
    >;
    transitionProps?: Omit<
      $Type.Transition.PropTransitionComponentCommonProps,
      'direction' | 'in'
    >;
    InnerComponent?: typeof Paper;
    innerProps?: $Type.ReactUtils.CreatePropComponentProps<typeof Paper>;
  },
  typeof Modal
>;

const Drawer: React.FC<Props> = ({
  children,
  open = false,
  anchor = 'left',
  TransitionComponent = Slide,
  transitionProps: propTransitionProps = {},
  InnerComponent = Paper,
  innerProps: propInnerProps = {},
  ...other
}) => {
  const direction = getSlideDirections(anchor);

  const props = {
    ...other,
    ...React.useMemo(() => {
      return {
        classNames: [...(other.classNames || []), $classNames.drawer],
        contentsProps: {
          ...other.contentsProps,
          style: {
            ...$modalContentStyle.style,
            ...$modalContentStyle[anchor].style,
            ...(other.contentsProps || {}).style,
          },
          classNames: [
            ...((other.contentsProps || {}).classNames || []),
            $classNames.drawerContainer,
          ],
        },
      };
    }, [other.classNames, other.style, other.contentsProps]),
  };

  const transitionProps = {
    ...propTransitionProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$transitionStyle.style,
          ...propTransitionProps.style,
        },
        classNames: [
          ...(propTransitionProps.classNames || []),
          $classNames.drawerTransition,
        ],
      };
    }, [propTransitionProps.style, propTransitionProps.classNames]),
  };

  const innerProps = {
    ...propInnerProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$innerStyle.style,
          ...(isHorizontal(anchor)
            ? $innerStyle.horizontal.style
            : $innerStyle.vertical.style),
          ...propInnerProps.style,
        },
        classNames: [
          ...(propInnerProps.classNames || []),
          $classNames.drawerInner,
        ],
      };
    }, [propInnerProps.style, propInnerProps.classNames]),
  };

  return (
    <Modal open={open} {...props}>
      <TransitionComponent
        in={open}
        appear={true}
        hideVisibility={false}
        direction={direction}
        {...transitionProps}
      >
        <InnerComponent
          elevation={$styles.inner.elevation}
          shape="corner"
          {...innerProps}
        >
          {children}
        </InnerComponent>
      </TransitionComponent>
    </Modal>
  );
};

export default Drawer;
