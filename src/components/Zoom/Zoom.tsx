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

type Props = $Type.ReactUtils.CreateProps<
  $Type.Transition.CommonProps,
  typeof BaseElement,
  Omit<
    $Type.Components.CSSTransitionProps,
    $Type.Transition.CSSTransitionIgnoreProps
  >
>;

const Zoom: React.FC<Props> = ({
  in: inProp,
  children,
  duration = $styles.duration,
  easing = $styles.easing,
  hideVisibility = true,
  disableEnter,
  appear = true,
  onEnter,
  onEntering,
  onExiting,
  onExited,
  ...other
}) => {
  const ref = React.useRef<null | HTMLElement>(null);

  const [durations, easings] = React.useMemo(() => {
    return [genDurations(duration), genEasings(easing)];
  }, [duration, easing]);

  React.useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!appear && inProp) {
      setTransform(node, $styles.enteredScale);
    } else {
      if (!(appear && inProp)) {
        setTransform(node, $styles.exitedScale);
      }
      if (hideVisibility) node.style.visibility = 'hidden';
    }
  }, []);

  const handleEnter = React.useCallback(
    (node: HTMLElement, appearing: boolean) => {
      if (!disableEnter) {
        setTransform(node, $styles.exitedScale);
        if (onEnter) onEnter(node, appearing);
      }
    },
    []
  );

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
      setTransform(node, $styles.enteredScale);
      if (hideVisibility) node.style.visibility = '';
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
      setTransform(node, $styles.exitedScale);
      if (onExiting) onExiting(node);
    },
    [onExiting, durations, easings]
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
      in={inProp}
      timeout={durations}
      appear={appear}
      onEnter={handleEnter}
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
            _style_={$styles.style}
            _className_={$classNames.zoom}
            _refer_={ref}
            {...childProps}
          >
            {children}
          </BaseElement>
        );
      }}
    </CSSTransition>
  );
};

export default Zoom;
