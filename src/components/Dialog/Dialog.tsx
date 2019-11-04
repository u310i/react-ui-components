import React from 'react';
import $ from './_constants';
import { Modal, Fade, Paper } from '..';

const $classNames = $.classNames;
const $styles = $.styles;
const $modalContentStyle = $styles.modal.contents;
const $transitionStyle = $styles.transition;
const $innerStyle = $styles.inner;

type Props = $Type.ReactUtils.CreateProps<
  {
    open?: boolean;
    scrollBody?: boolean;
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
  scrollBody,
  fullScreen,
  TransitionComponent = Fade,
  transitionProps: propTransitionProps = {},
  InnerComponent = Paper,
  innerProps: propInnerProps = {},
  ...other
}) => {
  const props = {
    ...other,
    ...React.useMemo(() => {
      return {
        classNames: [...(other.classNames || []), $classNames.dialog],
        contentsProps: {
          ...other.contentsProps,
          style: {
            ...$modalContentStyle.style,
            ...(scrollBody && $modalContentStyle.scrollBody.style),
            ...(other.contentsProps || {}).style,
          },
          classNames: [
            ...((other.contentsProps || {}).classNames || []),
            $classNames.dialogContainer,
          ],
        },
      };
    }, [other.classNames, other.contentsProps]),
  };

  const transitionProps = {
    ...propTransitionProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$transitionStyle.style,
          ...(scrollBody && $transitionStyle.scrollBody.style),
          ...propTransitionProps.style,
        },
        classNames: [
          ...(propTransitionProps.classNames || []),
          $classNames.dialogTransition,
        ],
      };
    }, [propTransitionProps.style, scrollBody, propTransitionProps.classNames]),
  };

  const innerProps = {
    ...propInnerProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$innerStyle.style,
          ...(scrollBody && $innerStyle.scrollBody.style),
          ...(fullScreen && $innerStyle.fullScreen.style),
          ...propInnerProps.style,
        },
        classNames: [
          ...(propInnerProps.classNames || []),
          $classNames.dialogInner,
        ],
      };
    }, [
      propInnerProps.style,
      scrollBody,
      fullScreen,
      propInnerProps.classNames,
    ]),
  };

  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [open]);

  return (
    <Modal role="dialog" open={open} {...props}>
      <TransitionComponent
        in={open}
        hideVisibility={false}
        {...transitionProps}
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
