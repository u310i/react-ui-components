import React from "react";
import $ from "./_constants";
import {
  roundNumber,
  genTransitionProperty,
  genDurations,
  genEasings,
  setTransition,
  setTransform
} from "scripts";
import { CSSTransition, BaseElement } from "..";

const enteredScale = $.styles.enteredScale;
const exitedScale = `scale(${$.styles.scaleXRatio}, ${$.styles.scaleYRatio})`;

const setExitedOpacity = (node: HTMLElement) => {
  node.style.opacity = $.styles.exitedOpacity;
};

const setEnteredOpacity = (node: HTMLElement) => {
  node.style.opacity = $.styles.enteredOpacity;
};

type ComponentProps = $Type.Transition.CommonProps;

type Props = $Type.MergeObject<
  ComponentProps,
  $Type.Components.BaseElement._GeneralProps
>;

declare global {
  namespace $Type {
    namespace Components {
      namespace Grow {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const Grow: React.FC<Props> = ({
  in: inProp,
  children,
  duration = $.styles.duration,
  easing = $.styles.easing,
  hideVisibility = true,
  disableEnter,
  appear = true,
  onEnter,
  onEntering,
  onExiting,
  onExited,
  ...other
}) => {
  const nodeRef = React.useRef<null | HTMLElement>(null);

  const [durations, easings] = React.useMemo(() => {
    return [genDurations(duration), genEasings(easing)];
  }, [duration, easing]);

  React.useLayoutEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    if (!appear && inProp) {
      setTransform(node, enteredScale);
      setEnteredOpacity(node);
    } else {
      if (!(appear && inProp)) {
        setTransform(node, exitedScale);
        setExitedOpacity(node);
      }
      if (hideVisibility) node.style.visibility = "hidden";
    }
  }, []);

  const handleEnter = React.useCallback(
    (node: HTMLElement, appearing: boolean) => {
      if (!disableEnter) {
        setTransform(node, exitedScale);
        setExitedOpacity(node);
      }
      if (onEnter) onEnter(node, appearing);
    },
    []
  );

  const handleEntering = React.useCallback(
    (node: HTMLElement, appearing: boolean) => {
      const [duration, easing] = appearing
        ? [durations.appear, easings.appear]
        : [durations.enter, easings.enter];
      const transitionProperty = genTransitionProperty([
        {
          property: "opacity",
          duration,
          easing
        },
        {
          property: "transform",
          duration: roundNumber(duration * $.styles.scaleDurationRatio, 0),
          easing
        }
      ]);
      setTransition(node, transitionProperty);
      setTransform(node, enteredScale);
      setEnteredOpacity(node);
      if (hideVisibility) node.style.visibility = "";
      if (onEntering) onEntering(node, appearing);
    },
    [onEntering, durations, easings]
  );

  const handleExiting = React.useCallback(
    (node: HTMLElement) => {
      const transitionProperty = genTransitionProperty([
        {
          property: "opacity",
          duration: durations.exit,
          easing: easings.exit
        },
        {
          property: "transform",
          duration: roundNumber(
            durations.exit * $.styles.scaleDurationRatio,
            0
          ),
          easing: easings.exit,
          delay: roundNumber(
            durations.exit * $.styles.outScalingDelayRatioFromDuration,
            0
          )
        }
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
      if (hideVisibility) node.style.visibility = "hidden";
      if (onExited) onExited(node);
    },
    [onExited]
  );

  return (
    <CSSTransition
      disableClassing={true}
      {...other}
      appear={appear}
      in={inProp}
      timeout={durations}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onExiting={handleExiting}
      onExited={handleExited}
    >
      {(
        _state: $Type.Components.CSSTransition._ChildStatus,
        childProps: $Type.Components.BaseElement._Props
      ) => {
        return (
          <BaseElement
            elementName="div"
            {...childProps}
            _style_={$.styles.style}
            _className_={$.classNames.name}
            _refer_={nodeRef}
          >
            {children}
          </BaseElement>
        );
      }}
    </CSSTransition>
  );
};

export default Grow;
