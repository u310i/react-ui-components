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

type CharacteristicProps = {
  collapsedHeight?: string;
  innerProps?: $Type.Components.BaseElement._GeneralProps;
};

type ComponentProps = $Type.Transition.CommonProps & CharacteristicProps;

type Props = $Type.MergeObject<
  ComponentProps,
  $Type.Components.BaseElement._GeneralProps
>;

declare global {
  namespace $Type {
    namespace Components {
      namespace Collapse {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
        type _CharacteristicProps = CharacteristicProps;
      }
    }
  }
}

const Collapse: React.FC<Props> = ({
  in: inProp,
  children,
  duration = $.styles.duration,
  easing = $.styles.easing,
  hideVisibility = true,
  disableEnter,
  collapsedHeight = $.styles.collapsedHeight,
  innerProps,
  appear = true,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  ...other
}) => {
  const outerNodeRef = React.useRef<null | HTMLElement>(null);
  const innerNodeRef = React.useRef<null | HTMLElement>(null);

  const [durations, easings] = React.useMemo(() => {
    return [genDurations(duration), genEasings(easing)];
  }, [duration, easing]);

  React.useLayoutEffect(() => {
    const node = outerNodeRef.current;
    if (!node) return;
    if (!appear && inProp) {
      node.style.height = $.styles.enteredHeight;
      node.style.overflow = "visible";
    } else {
      if (!(appear && inProp)) {
        node.style.height = collapsedHeight;
        node.style.overflow = "hidden";
      }
      if (hideVisibility) node.style.visibility = "hidden";
    }
  }, []);

  const handleEnter = React.useCallback(
    (node: HTMLElement, appearing: boolean) => {
      if (!disableEnter) {
        node.style.height = collapsedHeight;
        node.style.overflow = "hidden";
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
            property: "height",
            duration,
            easing
          }
        ])
      );
      if (!innerNodeRef.current) return;
      node.style.height = `${innerNodeRef.current.clientHeight}px`;
      node.style.overflow = "hidden";
      if (hideVisibility) node.style.visibility = "";
      if (onEntering) onEntering(node, appearing);
    },
    [onEntering]
  );

  const handleEntered = React.useCallback(
    (node: HTMLElement, appearing: boolean) => {
      node.style.overflow = "visible";
      node.style.height = $.styles.enteredHeight;
      if (onEntered) onEntered(node, appearing);
    },
    [onEntered]
  );

  const handleExit = React.useCallback(
    (node: HTMLElement) => {
      setTransition(
        node,
        genTransitionProperty([
          {
            property: "height",
            duration: durations.exit,
            easing: easings.exit
          }
        ])
      );
      node.style.height = `${node.clientHeight}px`;
      node.style.overflow = "hidden";
      if (onExit) onExit(node);
    },
    [onExit]
  );

  const handleExiting = React.useCallback(
    (node: HTMLElement) => {
      node.style.height = collapsedHeight;
      if (onExiting) onExiting(node);
    },
    [onExiting]
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
      appear={appear}
      in={inProp}
      timeout={durations}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
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
            _style_={$.styles.outer.style}
            _className_={$.classNames.name}
            _refer_={outerNodeRef}
          >
            <BaseElement
              elementName="div"
              {...innerProps}
              _style_={$.styles.inner.style}
              _className_={$.classNames.nameInner}
              _refer_={innerNodeRef}
            >
              {children}
            </BaseElement>
          </BaseElement>
        );
      }}
    </CSSTransition>
  );
};

export default Collapse;
