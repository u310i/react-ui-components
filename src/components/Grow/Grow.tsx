import React from 'react';
import $ from './_constants';
import {
  roundNumber,
  genTransitionProperty,
  genDurations,
  genEasings,
  setTransition,
  setTransform,
} from 'scripts';
import { CSSTransition, BaseElement } from '..';

const $names = $.names;
const $styles = $.styles;

const enteredScale = $styles.enteredScale;
const exitedScale = `scale(${$styles.scaleXRatio}, ${$styles.scaleYRatio})`;

const setExitedOpacity = (node: HTMLElement) => {
  node.style.opacity = $styles.exitedOpacity;
};

const setEnteredOpacity = (node: HTMLElement) => {
  node.style.opacity = $styles.enteredOpacity;
};

type Props = $Type.CreateProps<
  {
    duration?: $Type.Transition.Duration;
    easing?: $Type.Transition.Easing;
    disableHideVisibility?: boolean;
  },
  typeof BaseElement,
  $Type.Transition.TransitionProps
>;

const Grow: React.FC<Props> = ({
  in: inProp,
  children,
  duration = $styles.duration,
  easing = $styles.easing,
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
    if (!node) return;
    if (!appear && inProp) {
      setTransform(node, enteredScale);
      setEnteredOpacity(node);
    } else {
      setTransform(node, exitedScale);
      setExitedOpacity(node);
      if (!disableHideVisibility) node.style.visibility = 'hidden';
    }
  }, []);

  const handleEntering = React.useCallback(
    (node: HTMLElement, appearing: boolean) => {
      const [duration, easing] = appearing
        ? [durations.appear, easings.appear]
        : [durations.enter, easings.enter];
      const transitionProperty = genTransitionProperty([
        {
          property: 'opacity',
          duration,
          easing,
        },
        {
          property: 'transform',
          duration: roundNumber(duration * $styles.scaleDurationRatio, 0),
          easing,
        },
      ]);
      setTransition(node, transitionProperty);
      setTransform(node, enteredScale);
      setEnteredOpacity(node);
      if (!disableHideVisibility) node.style.visibility = null;
      if (onEntering) onEntering(node, appearing);
    },
    [onEntering, durations, easings]
  );

  const handleExiting = React.useCallback(
    (node: HTMLElement) => {
      const transitionProperty = genTransitionProperty([
        {
          property: 'opacity',
          duration: durations.exit,
          easing: easings.exit,
        },
        {
          property: 'transform',
          duration: roundNumber(durations.exit * $styles.scaleDurationRatio, 0),
          easing: easings.exit,
          delay: roundNumber(
            durations.exit * $styles.outScalingDelayRatioFromDuration,
            0
          ),
        },
      ]);
      setTransition(node, transitionProperty);
      setTransform(node, exitedScale);
      setExitedOpacity(node);
      if (onExiting) onExiting(node);
    },
    [onExiting, durations, easings]
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
      onEntering={handleEntering}
      onExiting={handleExiting}
      onExited={handleExited}
      in={inProp}
      timeout={durations}
      {...other}
    >
      {(
        state: $Type.Transition.childStatus,
        childProps: $Type.BaseElementProps
      ) => {
        return (
          <BaseElement
            elementName="div"
            _style_={$styles.style}
            _className_={$names.ucGrow}
            _refer_={_ref_}
            {...childProps}
          >
            {children}
          </BaseElement>
        );
      }}
    </CSSTransition>
  );
};

export default Grow;
