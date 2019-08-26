import * as React from 'react';
import $ from './_constants';
import {} from 'scripts';
import { Fade, BaseElement } from '..';

const $styles = $.styles;

type Props<T = $Type.PropTransitionComponentProps> = $Type.CreateProps<
  {
    open: boolean;
    disablePointerEvents?: boolean;
    duration?: $Type.Transition.Duration;
    invisible?: boolean;
    TransitionComponent?: React.FC<T>;
    transitionProps?: T;
  },
  typeof BaseElement
>;

const Backdrop: React.FC<Props> = ({
  children,
  open = true,
  disablePointerEvents = false,
  duration = $styles.duration,
  invisible = false,
  TransitionComponent = Fade,
  transitionProps: propTransitionProps = {},
  ...other
}) => {
  const _style_ = React.useMemo(() => {
    return {
      ...$styles.style,
      ...(invisible && $styles.invisible.style),
      ...(disablePointerEvents && $styles.disablePointerEvents.style),
    };
  }, [invisible, disablePointerEvents]);

  const transitionProps = {
    ...propTransitionProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$styles.transition.style,
          ...(propTransitionProps as any).style,
        },
        classNames: [
          ...((propTransitionProps as any).classNames || []),
          $.names.ucBackdrop,
        ],
      };
    }, [
      (propTransitionProps as any).style,
      (propTransitionProps as any).classNames,
    ]),
  };

  return (
    <TransitionComponent
      in={open}
      duration={duration}
      aria-hidden={true}
      {...transitionProps}
    >
      <BaseElement
        elementName="div"
        _style_={_style_}
        _className_={$.names.ucBackdropInner}
        {...other}
      >
        {children}
      </BaseElement>
    </TransitionComponent>
  );
};

export default Backdrop;
