import * as React from 'react';
import $ from './_constants';
import {} from 'scripts';
import { Fade, BaseElement } from '..';

const $styles = $.styles;

type Props = $Type.ReactUtils.CreateProps<
  {
    open?: boolean;
    disablePointerEvents?: boolean;
    duration?: $Type.Transition.Duration;
    invisible?: boolean;
    TransitionComponent?: React.FC<
      $Type.Transition.PropTransitionComponentProps
    >;
    transitionProps?: Omit<$Type.Transition.PropTransitionComponentProps, 'in'>;
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
          ...propTransitionProps.style,
        },
        classNames: [
          ...(propTransitionProps.classNames || []),
          $.names.backdrop,
        ],
      };
    }, [propTransitionProps.style, propTransitionProps.classNames]),
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
        _className_={$.names.backdropInner}
        {...other}
      >
        {children}
      </BaseElement>
    </TransitionComponent>
  );
};

export default Backdrop;
