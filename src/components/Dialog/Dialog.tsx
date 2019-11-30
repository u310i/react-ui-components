import * as React from "react";
import $ from "./_constants";
import { injectElementToRef } from "scripts";
import Modal from "../Modal/Modal";
import Fade from "../Fade/Fade";
import Paper from "../Paper/Paper";

const $modalContentStyle = $.styles.modal.contents;
const $transitionStyle = $.styles.transition;
const $innerStyle = $.styles.inner;

type ComponentProps = {
  open?: boolean;
  scrollBody?: boolean;
  fullScreen?: boolean;
  // "Type instantiation is excessively deep and possibly infinite.ts(2589)"
  // TransitionComponent?: React.FC<$Type.Transition.AllProps>;
  TransitionComponent?: React.FC<any>;
  transitionProps?: $Type.Transition.AllProps;
  InnerComponent?: React.FC<$Type.Components.Paper._Props & $Type.AnyObject>;
  innerProps?: $Type.Components.Paper._Props & $Type.AnyObject;
  positionX?: number | string;
  positionY?: number | string;
  modalInnerProps?: $Type.Components.BaseElement._GeneralProps;
};

type Props = $Type.MergeObject<ComponentProps, $Type.Components.Modal._Props>;

declare global {
  namespace $Type {
    namespace Components {
      namespace Dialog {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

export const Dialog: React.FC<Props> = ({
  children,
  open = false,
  scrollBody,
  fullScreen,
  TransitionComponent = Fade,
  transitionProps: propTransitionProps = {},
  InnerComponent = Paper,
  innerProps: propInnerProps = {},
  positionX,
  positionY,
  modalInnerProps = {},
  ...other
}) => {
  const modalInnerNodeRef = React.useRef<null | HTMLElement>(null);

  const handleModalInnerNodeRef = React.useCallback(
    element => {
      modalInnerNodeRef.current = element;
      injectElementToRef(modalInnerProps.refer, element);
    },
    [modalInnerProps.refer]
  );
  const handleModalClickOutsideTarget = React.useCallback(
    () =>
      modalInnerNodeRef.current && modalInnerNodeRef.current.firstElementChild,
    []
  );

  const props = {
    ...other,
    ...React.useMemo(() => {
      return {
        classNames: [...(other.classNames || []), $.classNames.name],
        contentsProps: {
          ...other.contentsProps,
          style: {
            ...$modalContentStyle.style,
            ...(scrollBody && $modalContentStyle.scrollBody.style),
            ...(other.contentsProps || {}).style
          },
          classNames: [
            ...((other.contentsProps || {}).classNames || []),
            $.classNames.nameContainer
          ]
        },
        innerProps: {
          ...modalInnerProps,
          refer: handleModalInnerNodeRef
        },
        clickOutsideProps: {
          ...other.clickOutsideProps,
          target: handleModalClickOutsideTarget
        }
      };
    }, [other.classNames, other.contentsProps, modalInnerProps])
  };

  const transitionProps = {
    ...propTransitionProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$transitionStyle.style,
          ...(scrollBody && $transitionStyle.scrollBody.style),
          top: positionY,
          left: positionX,
          ...propTransitionProps.style
        },
        classNames: [
          ...(propTransitionProps.classNames || []),
          $.classNames.nameTransition
        ]
      };
    }, [
      propTransitionProps.style,
      scrollBody,
      propTransitionProps.classNames,
      positionX,
      positionY
    ])
  };

  const innerProps = {
    ...propInnerProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$innerStyle.style,
          ...(scrollBody && $innerStyle.scrollBody.style),
          ...(fullScreen && $innerStyle.fullScreen.style),
          ...propInnerProps.style
        },
        classNames: [
          ...(propInnerProps.classNames || []),
          $.classNames.nameInner
        ]
      };
    }, [
      propInnerProps.style,
      scrollBody,
      fullScreen,
      propInnerProps.classNames
    ])
  };

  return (
    <Modal role="dialog" disableBackdrop={fullScreen} {...props} open={open}>
      <TransitionComponent
        hideVisibility={false}
        {...transitionProps}
        in={open}
      >
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
