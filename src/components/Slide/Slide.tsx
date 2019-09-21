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

const $classNames = $.classNames;
const $styles = $.styles;

type Direction = 'left' | 'right' | 'up' | 'down';

const getExitedTranslateValue = (
  node: HTMLElement,
  direction: Direction,
  gutter: number
): string => {
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

type Props = $Type.ReactUtils.CreateProps<
  $Type.Transition.CommonProps & {
    direction?: Direction;
    gutter?: number;
  },
  typeof BaseElement,
  Omit<$Type.Components.CSSTransitionProps, 'timeout'>
>;

declare global {
  namespace $Type {
    namespace Components {
      type SlideDirection = Direction;
    }
  }
}

const Slide: React.FC<Props> = ({
  in: inProp,
  children,
  duration = $styles.duration,
  easing = $styles.easing,
  direction = $styles.direction,
  gutter = $styles.gutter,
  hideVisibility,
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
    if (!node) return;
    if (!appear && inProp) {
      setTransform(node, $styles.enteredTranslate);
    } else {
      const translate = getExitedTranslateValue(node, direction, gutter);
      setTransform(node, translate);
      if (hideVisibility) node.style.visibility = 'hidden';
    }
  }, []);

  const handleEntering = React.useCallback(
    (node: HTMLElement, appearing: boolean) => {
      const [duration, easing] = appearing
        ? [durations.appear, easings.appear]
        : [durations.enter, easings.enter];
      setTransition(
        node,
        genTransitionProperty([
          {
            property: 'transform',
            duration,
            easing,
          },
        ])
      );
      setTransform(node, $styles.enteredTranslate);
      if (hideVisibility) node.style.visibility = null;
      if (onEntering) onEntering(node, appearing);
    },
    [onEntering, durations, easings]
  );

  const handleExiting = React.useCallback(
    (node: HTMLElement) => {
      setTransition(
        node,
        genTransitionProperty([
          {
            property: 'transform',
            duration: durations.exit,
            easing: easings.exit,
          },
        ])
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
      if (hideVisibility) node.style.visibility = 'hidden';
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
        state: $Type.Components.CSSTransitionChildStatus,
        childProps: $Type.Components.BaseElementProps
      ) => {
        return (
          <BaseElement
            elementName="div"
            _refer_={_ref_}
            _style_={$styles.style}
            _className_={$classNames.slide}
            {...childProps}
          >
            {children}
          </BaseElement>
        );
      }}
    </CSSTransition>
  );
};

export default Slide;
