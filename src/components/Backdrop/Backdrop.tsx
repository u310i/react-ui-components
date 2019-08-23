import * as React from 'react';
import $ from './_constants';
import {} from 'scripts';
import { Fade, BaseElement } from '..';

type Props<T extends React.FC<any>> = $Type.CreateProps<
  {
    open: boolean;
    disablePointerEvents?: boolean;
    duration?: $Type.Constants.Transition.Duration;
    invisible?: boolean;
    TransitionComponent?: T;
    transitionProps?: React.ComponentProps<T>;
  },
  $Type.IdentifiedBaseElementProps<'div'>
>;

const $styles = $.styles;

const Backdrop: React.FC<Props> = ({
  children = null,
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
          $.names.ucBackdrop,
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
        _className_={$.names.ucBackdropInner}
        {...other}
      >
        {children}
      </BaseElement>
    </TransitionComponent>
  );
};

export default Backdrop;
