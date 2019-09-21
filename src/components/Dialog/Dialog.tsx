import React from 'react';
import $ from './_constants';
import { injectElementToRef } from 'scripts';
import { Modal, Fade, Paper } from '..';

const $classNames = $.classNames;
const $styles = $.styles;
const $transitionStyle = $styles.transition;
const $innerStyle = $styles.inner;

type Props = $Type.ReactUtils.CreateProps<
  {
    open?: boolean;
    enableScrollBody?: boolean;
    fullScreen?: boolean;
    TransitionComponent?: React.FC<
      $Type.Transition.PropTransitionComponentCommonProps
    >;
    transitionProps?: Omit<
      $Type.Transition.PropTransitionComponentCommonProps,
      'in'
    >;
    InnerComponent?: typeof Paper;
    innerProps?: $Type.ReactUtils.CreatePropComponentProps<typeof Paper>;
  },
  typeof Modal
>;

const Dialog: React.FC<Props> = ({
  children,
  open = false,
  enableScrollBody = false,
  fullScreen,
  TransitionComponent = Fade,
  transitionProps: propTransitionProps = {},
  InnerComponent = Paper,
  innerProps: propInnerProps = {},
  ...other
}) => {
  const innerRef = React.useRef<null | HTMLElement>(null);

  const props = {
    ...other,
    ...React.useMemo(() => {
      return {
        classNames: [...(other.classNames || []), $classNames.dialog],
        contentProps: {
          ...other.contentProps,
          classNames: [
            ...((other.contentProps || {}).classNames || []),
            $classNames.dialogContainer,
          ],
        },
      };
    }, [other.classNames, other.contentProps]),
  };

  const handleTransitionEntering = React.useCallback((node, appearing) => {
    innerRef.current!.style.boxShadow = null;
    if (propTransitionProps.onEntering)
      propTransitionProps.onEntering(node, appearing);
  }, []);
  const handleTransitionExited = React.useCallback(node => {
    innerRef.current!.style.boxShadow = 'none';
    if (propTransitionProps.onExited) propTransitionProps.onExited(node);
  }, []);
  const transitionProps = {
    ...propTransitionProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$transitionStyle.style,
          ...(enableScrollBody && $transitionStyle.scrollBody.style),
          ...propTransitionProps.style,
        },
        classNames: [
          ...(propTransitionProps.classNames || []),
          $classNames.dialogTransition,
        ],
        onExited: handleTransitionExited,
        onEntering: handleTransitionEntering,
      };
    }, [
      propTransitionProps.style,
      enableScrollBody,
      propTransitionProps.classNames,
    ]),
  };

  const handleInnerRef = React.useCallback((element: Element | null) => {
    innerRef.current = element as HTMLElement;
    injectElementToRef(propInnerProps.refer, element);
  }, []);
  const innerProps = {
    ...propInnerProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$innerStyle.style,
          ...(enableScrollBody && $innerStyle.scrollBody.style),
          ...(fullScreen && $innerStyle.fullScreen.style),
          ...propInnerProps.style,
        },
        classNames: [
          ...(propInnerProps.classNames || []),
          $classNames.dialogInner,
        ],
        refer: handleInnerRef,
      };
    }, [
      propInnerProps.style,
      enableScrollBody,
      fullScreen,
      propInnerProps.classNames,
    ]),
  };

  return (
    <Modal open={open} closeAfterTransition fallbackFocus={innerRef} {...props}>
      <TransitionComponent in={open} {...transitionProps}>
        <InnerComponent
          elevation={$innerStyle.elevation}
          shape={fullScreen ? $innerStyle.fullScreen.shape : $innerStyle.shape}
          {...innerProps}
        >
          {children}
        </InnerComponent>
      </TransitionComponent>
    </Modal>
  );
};

export default Dialog;
