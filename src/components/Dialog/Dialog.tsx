import React from 'react';
import $ from './_constants';
import { injectElementToRef } from 'scripts';
import { Modal, Fade, Paper } from '..';

const $names = $.names;
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
        classNames: [...(other.classNames || []), $names.dialog],
        contentProps: {
          ...other.contentProps,
          classNames: [
            ...((other.contentProps || {}).classNames || []),
            $names.dialogContainer,
          ],
        },
      };
    }, [other.classNames, other.contentProps]),
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
