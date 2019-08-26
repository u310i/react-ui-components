import React from 'react';
import $ from './_constants';
import { injectElementToRef } from 'scripts';
import { Modal, Slide, Paper } from '..';

const $names = $.names;
const $styles = $.styles;
const $modalContentStyle = $styles.modal.content;
const $transitionStyle = $styles.transition;
const $innerStyle = $styles.inner;

export const isHorizontal = anchor => {
  return ['left', 'right'].indexOf(anchor) !== -1;
};

const slideDirections = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up',
};

export const getSlideDirections = anchor => {
  return slideDirections[anchor];
};

const Drawer = ({
  children,
  refer,
  open,
  onEscapeKeyDown,
  onOutsideClick,
  keepMount = true,
  anchor = 'left',
  arias: propArias,
  modalProps: propModalProps = {},
  TransitionComponent = Slide,
  transitionProps: propTransitionProps = {},
  InnerComponent = Paper,
  innerProps: propInnerProps = {},
}) => {
  const innerRef = React.useRef(null);

  if (!propModalProps.rootProps) propModalProps.rootProps = {};
  if (!propModalProps.contentProps) propModalProps.contentProps = {};
  const modalProps = {
    onEscapeKeyDown,
    onOutsideClick,
    keepMount,
    ...propModalProps,
    ...React.useMemo(() => {
      return {
        rootProps: {
          ...propModalProps.rootProps,
          classNames: [
            ...(propModalProps.rootProps.classNames || []),
            $names.ucDrawer,
          ],
        },
        contentProps: {
          ...propModalProps.contentProps,
          style: {
            ...$modalContentStyle.style,
            ...$modalContentStyle[anchor].style,
            ...propModalProps.contentProps.style,
          },
          classNames: [
            ...(propModalProps.contentProps.classNames || []),
            $names.ucDrawerContainer,
          ],
          arias: {
            'aria-modal': true,
            ...propArias,
            ...propModalProps.contentProps.arias,
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
          $names.ucDrawerTransition,
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
        classNames: [
          ...(propInnerProps.classNames || []),
          $names.ucDrawerInner,
        ],
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
        direction={getSlideDirections(anchor)}
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
