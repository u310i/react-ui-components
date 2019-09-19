import React from 'react';
import $ from './_constants';
import { injectElementToRef } from 'scripts';
import { Modal, Slide, Paper } from '..';

const $classNames = $.classNames
const $styles = $.styles;
const $modalContentStyle = $styles.modal.content;
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
      {
        direction?: $Type.Components.SlideDirection;
      } & Omit<$Type.Transition.PropTransitionComponentCommonProps, 'direction'>
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
  const innerRef = React.useRef(null);

  const direction = getSlideDirections(anchor);

  const props = {
    ...other,
    ...React.useMemo(() => {
      return {
        classNames: [...(other.classNames || []), $classNames.drawer],
        contentProps: {
          ...other.contentProps,
          style: {
            ...$modalContentStyle.style,
            ...$modalContentStyle[anchor].style,
            ...(other.contentProps || {}).style,
          },
          classNames: [
            ...((other.contentProps || {}).classNames || []),
            $classNames.drawerContainer,
          ],
        },
      };
    }, [other.classNames, other.style, other.contentProps]),
  };

  const transitionProps = {
    disableHideVisibility: true,
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

  const handleInnerRef = React.useCallback(element => {
    innerRef.current = element;
    injectElementToRef(propInnerProps.refer, element);
  }, []);
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
        classNames: [...(propInnerProps.classNames || []), $classNames.drawerInner],
        refer: handleInnerRef,
      };
    }, [propInnerProps.style, propInnerProps.classNames]),
  };

  return (
    <Modal open={open} closeAfterTransition fallbackFocus={innerRef} {...props}>
      <TransitionComponent
        in={open}
        appear={true}
        direction={direction}
        {...transitionProps}
      >
        <InnerComponent
          refer={innerRef}
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
