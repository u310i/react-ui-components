import React from 'react';
import $ from './_constants';
import {
  genTransitionProperty,
  genDurations,
  genEasings,
  setTransition,
} from 'scripts';
import { CSSTransition, BaseElement } from '..';

const $classNames = $.classNames;
const $styles = $.styles;

const setExitedOpacity = (node: HTMLElement) => {
  node.style.opacity = $styles.exitedOpacity;
};

const setEnteredOpacity = (node: HTMLElement) => {
  node.style.opacity = $styles.enteredOpacity;
};

type Props = $Type.ReactUtils.CreateProps<
  $Type.Transition.CommonProps,
  typeof BaseElement,
  Omit<$Type.Components.CSSTransitionProps, 'timeout'>
>;

const Fade: React.FC<Props> = ({
  in: inProp,
  children,
  duration = $styles.duration,
  easing = $styles.easing,
  appear = true,
  onEnter,
  onEntering,
  onExiting,
  onExited,
  hideVisibility = false,
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
      setEnteredOpacity(node);
    } else {
      setExitedOpacity(node);
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
            property: 'opacity',
            duration,
            easing,
          },
        ])
      );
      setEnteredOpacity(node);
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
            property: 'opacity',
            duration: durations.exit,
            easing: easings.exit,
          },
        ])
      );
      setExitedOpacity(node);
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
      ): React.ReactElement => {
        return (
          <BaseElement
            elementName="div"
            _style_={$styles.style}
            _className_={$classNames.fade}
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

export default Fade;
