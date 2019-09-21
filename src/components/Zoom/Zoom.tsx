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
  $Type.Components.CSSTransitionProps
>;

const Zoom: React.FC<Props> = ({
  in: inProp,
  children,
  duration = $styles.duration,
  easing = $styles.easing,
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
      setTransform(node, $styles.enteredScale);
    } else {
      setTransform(node, $styles.exitedScale);
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
      setTransform(node, $styles.enteredScale);
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

export default Zoom;
