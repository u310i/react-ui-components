import React from 'react';
import $ from './_constants';
import {
  genTransitionProperty,
  genDurations,
  genEasings,
  setTransition,
  setTransform,
} from 'scripts';
import { CSSTransition, BaseElement } from '..';

const $names = $.names;
const $styles = $.styles;

const getExitedTranslateValue = (node, direction, gutter) => {
  const rect = node.getBoundingClientRect();

  const computedStyle = window.getComputedStyle(node);
  const transform =
    computedStyle.getPropertyValue('-webkit-transform') ||
    computedStyle.getPropertyValue('transform');
  let offsetX = 0;
  let offsetY = 0;
  if (transform && transform !== 'none' && typeof transform === 'string') {
    const transformValues = transform
      .split('(')[1]
      .split(')')[0]
      .split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  switch (direction) {
    case 'left':
      return `translateX(${window.innerWidth +
        gutter}px) translateX(-${rect.left - offsetX}px)`;
    case 'right':
      return `translateX(-${rect.left + rect.width + gutter - offsetX}px)`;
    case 'up':
      return `translateY(${window.innerHeight +
        gutter}px) translateY(-${rect.top - offsetY}px)`;
    default:
      return `translateY(-${rect.top + rect.height + gutter - offsetY}px)`;
  }
};

type Props = $Type.CreateProps<
  {
    duration?: $Type.Transition.Duration;
    easing?: $Type.Transition.Easing;
    direction?: 'left' | 'right' | 'up' | 'down';
    gutter?: number;
    disableHideVisibility?: boolean;
  },
  React.ComponentProps<typeof CSSTransition> &
    $Type.IdentifiedBaseElementProps<'div'>
>;

const Slide: React.FC<Props> = ({
  in: inProp,
  children,
  duration = $styles.duration,
  easing = $styles.easing,
  direction = $styles.direction,
  gutter = $styles.gutter,
  disableHideVisibility,
  appear = true,
  onEnter,
  onEntering,
  onExiting,
  onExited,
  ...other
}) => {
  const _ref_ = React.useRef<null | HTMLElement>(null);

  const [durations, easings] = React.useMemo(() => {
    return [genDurations(duration), genEasings(easing)];
  }, [duration, easing]);

  React.useLayoutEffect(() => {
    const node = _ref_.current;
    if (!appear && inProp) {
      setTransform(node, $styles.enteredTranslate);
    } else {
      const translate = getExitedTranslateValue(node, direction, gutter);
      setTransform(node, translate);
      if (!disableHideVisibility) node.style.visibility = 'hidden';
    }
  }, []);

  const handleEntering = React.useCallback(
    (node: HTMLElement, appearing: boolean) => {
      setTransition(
        node,
        genTransitionProperty([['transform', durations.enter, easings.enter]])
      );
      setTransform(node, $styles.enteredTranslate);
      if (!disableHideVisibility) node.style.visibility = null;
      if (onEntering) onEntering(node, appearing);
    },
    [onEntering, durations, easings]
  );

  const handleExiting = React.useCallback(
    (node: HTMLElement) => {
      setTransition(
        node,
        genTransitionProperty([['transform', durations.exit, easings.exit]])
      );
      const translate = getExitedTranslateValue(node, direction, gutter);
      setTransform(node, translate);
      if (onExiting) onExiting(node);
    },
    [onExiting, durations, easings, gutter]
  );

  const handleExited = React.useCallback(
    (node: HTMLElement) => {
      setTransition(node, null);
      if (!disableHideVisibility) node.style.visibility = 'hidden';
      if (onExited) onExited(node);
    },
    [onExited]
  );

  return (
    <CSSTransition
      disableClassing={true}
      appear={appear}
      in={inProp}
      timeout={durations}
      onEntering={handleEntering}
      onExiting={handleExiting}
      onExited={handleExited}
      {...other}
    >
      {(
        state: $Type.Transition.TransitionStatus,
        childProps: { [prop: string]: any }
      ) => {
        return (
          <BaseElement
            elementName="div"
            _refer_={_ref_}
            _style_={$styles.style}
            _className_={$names.ucSlide}
            {...childProps}
            identifier={'slide'}
          >
            {children}
          </BaseElement>
        );
      }}
    </CSSTransition>
  );
};

export default Slide;
