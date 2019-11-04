import * as React from 'react';
import $ from './_constants';
import { injectElementToRef } from 'scripts';
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
  TransitionComponent = Fade,
  innerProps = {},
  ...other
}) => {
  const TransitionNodeRef = React.useRef<null | HTMLElement>(null);

  const handleTransitionNodeRef = React.useCallback(
    (element: Element | null) => {
      TransitionNodeRef.current = element as HTMLElement;
      injectElementToRef(other.refer, element);
    },
    [other.refer]
  );
  const props = {
    ...other,
    ...React.useMemo(() => {
      return {
        style: {
          ...$styles.style,
          ...other.style,
        },
        classNames: [...(other.classNames || []), $.classNames.backdrop],
        refer: handleTransitionNodeRef,
      };
    }, [other.style, other.classNames]),
  };

  React.useLayoutEffect(() => {
    TransitionNodeRef.current!.style.pointerEvents = disablePointerEvents
      ? 'none'
      : null;
  }, [disablePointerEvents]);

  return (
    <TransitionComponent in={open} duration={duration} {...props}>
      <BaseElement
        elementName="div"
        _style_={$styles.inner.style}
        _className_={$.classNames.backdropInner}
        {...innerProps}
      >
        {children}
      </BaseElement>
    </TransitionComponent>
  );
};

export default Backdrop;
