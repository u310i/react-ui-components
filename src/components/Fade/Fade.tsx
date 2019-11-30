import React from "react";
import $ from "./_constants";
import {
  genTransitionProperty,
  genDurations,
  genEasings,
  setTransition
} from "scripts";
import BaseElement from "../BaseElement/BaseElement";
import CSSTransition from "../CSSTransition/CSSTransition";

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
      namespace Fade {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const Fade: React.FC<Props> = ({
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
      setEnteredOpacity(node);
    } else {
      if (!(appear && inProp)) {
        setExitedOpacity(node);
      }
      if (hideVisibility) node.style.visibility = "hidden";
    }
  }, []);

  const handleEnter = React.useCallback(
    (node: HTMLElement, appearing: boolean) => {
      if (!disableEnter) {
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
      setTransition(
        node,
        genTransitionProperty([
          {
            property: "opacity",
            duration,
            easing
          }
        ])
      );
      setEnteredOpacity(node);
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
            property: "opacity",
            duration: durations.exit,
            easing: easings.exit
          }
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
      if (hideVisibility) node.style.visibility = "hidden";
      if (onExited) onExited(node);
    },
    [onExited]
  );

  return (
    <CSSTransition
      disableClass={true}
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
      ): React.ReactElement => {
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

export default Fade;
