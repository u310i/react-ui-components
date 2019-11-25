import * as React from "react";
import $ from "./_constants";
import { Modal, Slide, Paper } from "..";

const $modalContentStyle = $.styles.modal.contents;
const $transitionStyle = $.styles.transition;
const $innerStyle = $.styles.inner;

type Anchor = "left" | "right" | "top" | "bottom";

export const isHorizontal = (anchor: Anchor): boolean => {
  return ["left", "right"].indexOf(anchor) !== -1;
};

const slideDirections = {
  left: "right",
  right: "left",
  top: "down",
  bottom: "up"
} as const;

export const getSlideDirections = (
  anchor: Anchor
): $Type.Components.Slide._Direction => {
  return slideDirections[anchor];
};

type ComponentProps = {
  open?: boolean;
  anchor?: Anchor;
  // "Type instantiation is excessively deep and possibly infinite.ts(2589)"
  // TransitionComponent?: React.FC<$Type.Transition.AllProps>;
  TransitionComponent?: React.FC<{ [key: string]: any }>;
  transitionProps?: $Type.Transition.AllProps;
  InnerComponent?: React.FC<$Type.Components.Paper._Props & $Type.AnyObject>;
  innerProps?: $Type.Components.Paper._Props & $Type.AnyObject;
};

type Props = $Type.MergeObject<ComponentProps, $Type.Components.Modal._Props>;

declare global {
  namespace $Type {
    namespace Components {
      namespace Drawer {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
        type _Anchor = Anchor;
      }
    }
  }
}

const Drawer: React.FC<Props> = ({
  children,
  open = false,
  anchor = "left",
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
        classNames: [...(other.classNames || []), $.classNames.name],
        contentsProps: {
          ...other.contentsProps,
          style: {
            ...$modalContentStyle.style,
            ...$modalContentStyle.anchor[anchor].style,
            ...(other.contentsProps || {}).style
          },
          classNames: [
            ...((other.contentsProps || {}).classNames || []),
            $.classNames.nameContainer
          ]
        }
      };
    }, [other.classNames, other.style, other.contentsProps])
  };

  const transitionProps = {
    ...propTransitionProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$transitionStyle.style,
          ...propTransitionProps.style
        },
        classNames: [
          ...(propTransitionProps.classNames || []),
          $.classNames.nameTransition
        ]
      };
    }, [propTransitionProps.style, propTransitionProps.classNames])
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
          ...propInnerProps.style
        },
        classNames: [
          ...(propInnerProps.classNames || []),
          $.classNames.nameInner
        ]
      };
    }, [propInnerProps.style, propInnerProps.classNames])
  };

  return (
    <Modal {...props} open={open}>
      <TransitionComponent
        hideVisibility={false}
        {...transitionProps}
        in={open}
        appear={true}
        direction={direction}
      >
        <InnerComponent
          elevation={$.styles.inner.elevation}
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
