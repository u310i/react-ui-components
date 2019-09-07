import React from 'react';
import $ from './_constants';
import { injectElementToRef } from 'scripts';
import { Modal, Fade, Paper } from '..';

const $names = $.names;
const $styles = $.styles;
const $transitionStyle = $styles.transition;
const $innerStyle = $styles.inner;

type Props = $Type.CreateProps<{
  open?: boolean;
  onEscapeKeyDown?: (evt: KeyboardEvent) => void;
  onOutsideClick?: (evt: MouseEvent) => void;
  keepMount: boolean;
  arias: React.AriaAttributes;
  enableScrollBody: boolean;
  fullScreen: boolean;
  modalProps: Omit<$Type.ExtractProps<typeof Modal>, 'children'>;
  TransitionComponent: React.FC<$Type.Transition.PropTransitionComponentProps>;
  transitionProps: Omit<$Type.Transition.PropTransitionComponentProps, 'in'>;
  InnerComponent: typeof Paper;
  innerProps: Omit<$Type.ExtractProps<typeof Paper>, 'children'>;
}>;

const Dialog: React.FC<Props> = ({
  children,
  open = false,
  onEscapeKeyDown,
  onOutsideClick,
  keepMount = false,
  arias: propArias,
  enableScrollBody = false,
  fullScreen,
  modalProps: propModalProps = {},
  TransitionComponent = Fade,
  transitionProps: propTransitionProps = {},
  InnerComponent = Paper,
  innerProps: propInnerProps = {},
}) => {
  const innerRef = React.useRef<null | HTMLElement>(null);

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
            $names.dialog,
          ],
        },
        contentProps: {
          ...propModalPropsContentProps,
          classNames: [
            ...(propModalPropsContentProps.classNames || []),
            $names.dialogContainer,
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
          ...(enableScrollBody && $transitionStyle.scrollBody.style),
          ...propTransitionProps.style,
        },
        classNames: [
          ...(propTransitionProps.classNames || []),
          $names.dialogTransition,
        ],
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
        classNames: [...(propInnerProps.classNames || []), $names.dialogInner],
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
    <Modal
      open={open}
      closeAfterTransition
      fallbackFocus={innerRef}
      {...modalProps}
    >
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
