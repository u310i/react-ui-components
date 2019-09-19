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
      $Type.Transition.PropTransitionComponentCommonProps
    >;

    innerProps?: $Type.ReactUtils.CreatePropComponentProps<typeof BaseElement>;
  },
  Omit<$Type.Transition.PropTransitionComponentCommonProps, 'in'>
>;

const Backdrop: React.FC<Props> = ({
  children,
  open = true,
  disablePointerEvents = false,
  duration = $styles.duration,
  invisible = false,
  TransitionComponent = Fade,
  innerProps = {},
  ...other
}) => {
  const _style_ = React.useMemo(() => {
    return {
      ...$styles.style,
      ...(invisible && $styles.invisible.style),
      ...(disablePointerEvents && $styles.disablePointerEvents.style),
    };
  }, [invisible, disablePointerEvents]);

  const props = {
    ...other,
    ...React.useMemo(() => {
      return {
        style: {
          ...$styles.transition.style,
          ...other.style,
        },
        classNames: [...(other.classNames || []), $.classNames.backdrop],
      };
    }, [other.style, other.classNames]),
  };

  return (
    <TransitionComponent in={open} duration={duration} {...props}>
      <BaseElement
        elementName="div"
        _style_={_style_}
        _className_={$.classNames.backdropInner}
        {...innerProps}
      >
        {children}
      </BaseElement>
    </TransitionComponent>
  );
};

export default Backdrop;
