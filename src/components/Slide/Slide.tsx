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

type Direction = "left" | "right" | "up" | "down";

const getExitedTranslateValue = (
  node: HTMLElement,
  direction: Direction,
  gutter: number
): string => {
  const rect = node.getBoundingClientRect();

  const computedStyle = window.getComputedStyle(node);
  const transform =
    computedStyle.getPropertyValue("-webkit-transform") ||
    computedStyle.getPropertyValue("transform");
  let offsetX = 0;
  let offsetY = 0;
  if (transform && transform !== "none" && typeof transform === "string") {
    const transformValues = transform
      .split("(")[1]
      .split(")")[0]
      .split(",");
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }
  switch (direction) {
    case "left":
      return `translateX(${window.innerWidth}px) translateX(${(Math.ceil(
        rect.left
      ) -
        offsetX -
        gutter) *
        -1}px)`;
    case "right":
      return `translateX(${(Math.ceil(rect.left) +
        rect.width +
        gutter -
        offsetX) *
        -1}px)`;
    case "up":
      return `translateY(${window.innerHeight}px) translateY(${(Math.ceil(
        rect.top
      ) -
        offsetY -
        gutter) *
        -1}px)`;
    default:
      return `translateY(${(Math.ceil(rect.top) +
        rect.height +
        gutter -
        offsetY) *
        -1}px)`;
  }
};

type CharacteristicProps = {
  direction?: Direction;
  gutter?: number;
};

type ComponentProps = $Type.Transition.CommonProps & CharacteristicProps;

type Props = $Type.MergeObject<
  ComponentProps,
  $Type.Components.BaseElement._GeneralProps
>;

declare global {
  namespace $Type {
    namespace Components {
      namespace Slide {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
        type _CharacteristicProps = CharacteristicProps;
        type _Direction = Direction;
      }
    }
  }
}

const Slide: React.FC<Props> = ({
  in: inProp,
  children,
  duration = $.styles.duration,
  easing = $.styles.easing,
  hideVisibility = true,
  disableEnter,
  direction = $.styles.direction,
  gutter = $.styles.gutter,
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
      setTransform(node, $.styles.enteredTranslate);
    } else {
      if (!(appear && inProp)) {
        const translate = getExitedTranslateValue(node, direction, gutter);
        setTransform(node, translate);
      }
      if (hideVisibility) node.style.visibility = "hidden";
    }
  }, []);

  const handleEnter = React.useCallback(
    (node: HTMLElement, appearing: boolean) => {
      if (!disableEnter) {
        const translate = getExitedTranslateValue(node, direction, gutter);
        setTransform(node, translate);
      }
      if (onEnter) onEnter(node, appearing);
    },
    [onEnter, durations, easings, direction, gutter]
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
      setTransform(node, $.styles.enteredTranslate);

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
      const translate = getExitedTranslateValue(node, direction, gutter);
      setTransform(node, translate);
      if (onExiting) onExiting(node);
    },
    [onExiting, durations, easings, direction, gutter]
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
      ) => {
        return (
          <BaseElement
            elementName="div"
            {...childProps}
            _refer_={nodeRef}
            _style_={$.styles.style}
            _className_={$.classNames.name}
          >
            {children}
          </BaseElement>
        );
      }}
    </CSSTransition>
  );
};

export default Slide;
