import React from 'react';
import $ from './_constants';
import { injectElementToRef } from 'scripts';
import { Modal, Slide, Paper } from '..';

const $names = $.names;
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

type Props = $Type.CreateProps<{
  open?: boolean;
  anchor: Anchor;
  onEscapeKeyDown?: (evt: KeyboardEvent) => void;
  onOutsideClick?: (evt: MouseEvent) => void;
  keepMount: boolean;
  arias: React.AriaAttributes;
  modalProps: Omit<$Type.ExtractProps<typeof Modal>, 'children'>;
  TransitionComponent: React.FC<
    {
      direction?: $Type.Components.SlideDirection;
    } & Omit<$Type.Transition.CommonProps, 'direction'>
  >;
  transitionProps: Omit<$Type.Transition.CommonProps, 'direction'>;
  InnerComponent: typeof Paper;
  innerProps: Omit<$Type.ExtractProps<typeof Paper>, 'children'>;
}>;

const Drawer: React.FC<Props> = ({
  children,
  open,
  anchor = 'left',
  onEscapeKeyDown,
  onOutsideClick,
  keepMount = true,
  arias: propArias,
  modalProps: propModalProps = {},
  TransitionComponent = Slide,
  transitionProps: propTransitionProps = {},
  InnerComponent = Paper,
  innerProps: propInnerProps = {},
}) => {
  const innerRef = React.useRef(null);

  const direction = getSlideDirections(anchor);

  const propModalPropsRootProps = propModalProps.rootProps || {};
  const propModalPropsContentProps = propModalProps.contentProps || {};
  const modalProps = {
    onEscapeKeyDown,
    onOutsideClick,
    keepMount,
    ...propModalProps,
    ...React.useMemo(() => {
      return {
        rootProps: {
          ...propModalPropsRootProps,
          classNames: [
            ...(propModalPropsRootProps.classNames || []),
            $names.drawer,
          ],
        },
        contentProps: {
          ...propModalPropsContentProps,
          style: {
            ...$modalContentStyle.style,
            ...$modalContentStyle[anchor].style,
            ...propModalPropsContentProps.style,
          },
          classNames: [
            ...(propModalPropsContentProps.classNames || []),
            $names.drawerContainer,
          ],
          arias: {
            'aria-modal': true,
            ...propArias,
            ...propModalPropsContentProps.arias,
          },
        },
      };
    }, [propModalProps.rootProps, propModalProps.contentProps]),
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
          $names.drawerTransition,
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
        classNames: [...(propInnerProps.classNames || []), $names.drawerInner],
        refer: handleInnerRef,
      };
    }, [propInnerProps.style, propInnerProps.classNames]),
  };

  return (
    <Modal
      open={open}
      closeAfterTransition
      fallbackFocus={innerRef}
      {...modalProps}
    >
      <TransitionComponent
        in={open}
        appear={false}
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
