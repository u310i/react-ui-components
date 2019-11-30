import React from "react";
import $ from "./_constants";
import {
  genTransitionProperty,
  genDurations,
  genEasings,
  setTransition,
  setTransform
} from "scripts";
import BaseElement from "../BaseElement/BaseElement";
import CSSTransition from "../CSSTransition/CSSTransition";

type ComponentProps = $Type.Transition.CommonProps;

type Props = $Type.MergeObject<
  ComponentProps,
  $Type.Components.BaseElement._GeneralProps
>;

declare global {
  namespace $Type {
    namespace Components {
      namespace Zoom {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const Zoom: React.FC<Props> = ({
  children,
  in: inProp,
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
  const ref = React.useRef<null | HTMLElement>(null);

  const [durations, easings] = React.useMemo(() => {
    return [genDurations(duration), genEasings(easing)];
  }, [duration, easing]);

  React.useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!appear && inProp) {
      setTransform(node, $.styles.enteredScale);
    } else {
      if (!(appear && inProp)) {
        setTransform(node, $.styles.exitedScale);
      }
      if (hideVisibility) node.style.visibility = "hidden";
    }
  }, []);

  const handleEnter = React.useCallback(
    (node: HTMLElement, appearing: boolean) => {
      if (!disableEnter) {
        setTransform(node, $.styles.exitedScale);
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
            property: "transform",
            duration,
            easing
          }
        ])
      );
      setTransform(node, $.styles.enteredScale);
      if (hideVisibility) node.style.visibility = "";
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
            property: "transform",
            duration: durations.exit,
            easing: easings.exit
          }
        ])
      );
      setTransform(node, $.styles.exitedScale);
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
      {...other}
      disableClass={true}
      in={inProp}
      appear={appear}
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
            _refer_={ref}
          >
            {children}
          </BaseElement>
        );
      }}
    </CSSTransition>
  );
};

export default Zoom;
