import * as React from "react";
import $ from "./_constants";
import {
  addEventListener,
  raf,
  extractElement,
  injectElementToRef
} from "scripts";
import { BaseElement } from "..";

type ComponentProps = {
  active?: boolean;
  offset?: number;
  bottomOffset?: number;
  context?: $Type.ReactUtils.IncludeNode<Element>;
  scrollContext?: $Type.ReactUtils.IncludeNode<EventTarget>;
  pushing?: boolean;
  onBottom?: (e: Event) => void;
  onStick?: (e: Event) => void;
  onTop?: (e: Event) => void;
  onUnstick?: (e: Event) => void;
  contentsProps?: $Type.Components.BaseElement._GeneralProps;
  triggerNodeProps?: $Type.Components.BaseElement._GeneralProps;
};

type Props = $Type.MergeObject<
  ComponentProps,
  $Type.Components.BaseElement._GeneralProps
>;

declare global {
  namespace $Type {
    namespace Components {
      namespace Sticky {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const Sticky: React.FC<Props> = ({
  children,
  active = true,
  offset = 0,
  bottomOffset = 0,
  context = document.body,
  scrollContext = window,
  pushing = false,
  onBottom,
  onStick,
  onTop,
  onUnstick,
  contentsProps = {},
  triggerNodeProps = {},
  ...other
}) => {
  const [state, setState] = React.useState<{
    sticky: boolean;
    absolute?: boolean;
    top?: number | null;
    bottom?: number | null;
  }>({
    sticky: false
  });

  const stateRef = React.useRef<
    | "none"
    | "stickToContextBottom"
    | "stickToContextTop"
    | "stickToScreenBottom"
    | "stickToScreenTop"
  >("none");

  const pushingRef = React.useRef<boolean>(false);

  const stickyNodeRef = React.useRef<null | HTMLElement>(null);
  const triggerNodeRef = React.useRef<null | HTMLElement>(null);

  const cancelRafRef = React.useRef<null | number>(null);
  const prevActiveRef = React.useRef<null | boolean>(null);
  const prevScrollContextRef = React.useRef<null | $Type.ReactUtils.IncludeNode<
    EventTarget
  >>(null);

  const rectsRef = React.useRef<{
    context?: ClientRect;
    trigger?: ClientRect;
    sticky?: ClientRect;
  }>({});

  const removeResizeEventListenerRef = React.useRef<null | (() => void)>(null);
  const removeScrollEventListenerRef = React.useRef<null | (() => void)>(null);

  const tickingRef = React.useRef<boolean>(false);

  React.useLayoutEffect(() => {
    if (active === prevActiveRef.current) {
      if (scrollContext !== prevScrollContextRef.current) {
        removeListeners();
        addListeners(scrollContext);
      }
    } else {
      if (active) {
        handleUpdate();
        addListeners(scrollContext);
      } else {
        removeListeners();
        setState({ sticky: false });
      }
    }
    prevActiveRef.current = active;
    prevScrollContextRef.current = scrollContext;

    return () => {
      if (active) {
        removeListeners();
        cancelRafRef.current !== null && raf.cancel(cancelRafRef.current);
      }
    };
  }, [active, scrollContext]);

  const addListeners = React.useCallback(scrollContext => {
    const scrollContextNode = extractElement(scrollContext);

    if (scrollContextNode) {
      removeResizeEventListenerRef.current = addEventListener(
        scrollContextNode,
        "resize",
        handleUpdate,
        {},
        true
      );
      removeScrollEventListenerRef.current = addEventListener(
        scrollContextNode,
        "scroll",
        handleUpdate
      );
    }
  }, []);

  const removeListeners = React.useCallback(() => {
    removeResizeEventListenerRef.current &&
      removeResizeEventListenerRef.current();
    removeScrollEventListenerRef.current &&
      removeScrollEventListenerRef.current();
  }, []);

  // ----------------------------------------
  // Handlers
  // ----------------------------------------
  const fixedContextBottom = React.useRef<boolean>(false);
  const fixedContextTop = React.useRef<boolean>(false);

  const prevTriggerWidthRef = React.useRef<null | number>(null);

  const stickyRef = React.useRef<null | boolean>(state.sticky);
  stickyRef.current = state.sticky;

  const update = React.useCallback(
    e => {
      tickingRef.current = false;

      assignRects();
      const triggerWidth = rectsRef.current.trigger!.width;
      if (stickyRef.current) {
        if (triggerWidth !== prevTriggerWidthRef.current) {
          stickyNodeRef.current!.style.width = `${triggerWidth}px`;
        }
      } else {
        stickyNodeRef.current!.style.width = "";
      }

      prevTriggerWidthRef.current = triggerWidth;

      const oversized = isOversized();

      if (oversized) {
        if (fixedContextBottom.current) {
          if (
            bottomTouchScreenBottomWhenContextBottom() &&
            topTouchScreenTopWhenContextBottom()
          ) {
            return;
          }
          fixedContextBottom.current = false;
          if (!topTouchScreenTopWhenContextBottom()) {
            pushingRef.current = false;
            return stickToScreenTop(e);
          }
        }

        if (fixedContextTop.current) {
          if (
            topTouchScreenTopWhenContextTop() &&
            bottomTouchScreenBottomWhenContextTop()
          ) {
            return;
          }
          fixedContextTop.current = false;
          if (!bottomTouchScreenBottomWhenContextTop()) {
            pushingRef.current = true;
            return stickToScreenBottom(e);
          }
        }
      }

      if (pushingRef.current) {
        if (topReachContextTopWhenFixed()) {
          if (oversized) fixedContextTop.current = true;
          return stickToContextTop(e);
        }
        if (bottomTouchScreenBottomWhenContextBottom()) {
          return stickToScreenBottom(e);
        }
        return stickToContextBottom(e);
      }

      if (topTouchScreenTopWhenContextTop()) {
        if (bottomReachContextBottomWhenFixed()) {
          if (oversized) fixedContextBottom.current = true;
          return stickToContextBottom(e);
        }
        return stickToScreenTop(e);
      }

      return stickToContextTop(e);
    },
    [offset, bottomOffset]
  );

  const handleUpdate = React.useCallback((event?: Event) => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      cancelRafRef.current = raf(() => update(event));
    }
  }, []);

  // ----------------------------------------
  // Helpers
  // ----------------------------------------

  const assignRects = React.useCallback(() => {
    const contextNode = extractElement(context) || document.body;
    rectsRef.current.context = contextNode.getBoundingClientRect();
    console.log(triggerNodeRef.current);
    rectsRef.current.trigger = triggerNodeRef.current!.getBoundingClientRect();
    rectsRef.current.sticky = stickyNodeRef.current!.getBoundingClientRect();
  }, [context]);

  const style = React.useMemo(() => {
    const { sticky, absolute, top, bottom } = state;

    const stickyStyle: {
      width?: number;
      position?: "absolute" | "fixed";
      bottom?: "auto" | number;
      top?: "auto" | number;
      left?: "auto";
      right?: "auto";
    } = sticky
      ? {
          width: rectsRef.current.trigger!.width,
          ...(absolute ? $.styles.absolute.style : $.styles.fixed.style),
          ...(bottom === null && top !== null && { top, bottom: "auto" }),
          ...(top === null &&
            bottom !== null && { bottom: absolute ? 0 : bottom, top: "auto" }),
          ...$.styles.sticky.style
        }
      : {};

    return {
      ...$.styles.default.style,
      ...stickyStyle
    };
  }, [state.sticky, state.absolute, state.top, state.bottom]);

  const triggerStyle = React.useMemo(() => {
    return state.sticky
      ? {
          height: rectsRef.current.sticky!.height
        }
      : {};
  }, [state.sticky]);

  // ----------------------------------------
  // Helpers
  // ----------------------------------------

  const bottomTouchScreenBottomWhenContextBottom = React.useCallback(() => {
    return rectsRef.current.context!.bottom + bottomOffset > window.innerHeight;
  }, [bottomOffset]);

  const topTouchScreenTopWhenContextBottom = React.useCallback(() => {
    return (
      rectsRef.current.context!.bottom <
      rectsRef.current.sticky!.height + offset
    );
  }, [offset]);

  const topTouchScreenTopWhenContextTop = React.useCallback(() => {
    return rectsRef.current.trigger!.top < offset;
  }, [offset]);

  const bottomTouchScreenBottomWhenContextTop = React.useCallback(() => {
    return rectsRef.current.sticky!.bottom + bottomOffset > window.innerHeight;
  }, [bottomOffset]);

  // Return true when the component reached the bottom of the context
  const bottomReachContextBottomWhenFixed = React.useCallback(() => {
    return (
      rectsRef.current.sticky!.height + offset >=
      rectsRef.current.context!.bottom
    );
  }, [offset]);

  // Return true when the component reached the starting point
  const topReachContextTopWhenFixed = React.useCallback(() => {
    return rectsRef.current.sticky!.top <= rectsRef.current.trigger!.top;
  }, []);

  // Return true if the height of the component is higher than the window
  const isOversized = React.useCallback(() => {
    return (
      rectsRef.current.sticky!.height + offset + bottomOffset >
      window.innerHeight
    );
  }, []);

  const stickToContextBottom = React.useCallback(
    e => {
      if (stateRef.current !== "stickToContextBottom") {
        stateRef.current = "stickToContextBottom";
        onBottom && onBottom(e);
        pushingRef.current = pushing;
        setState({
          sticky: true,
          absolute: true,
          top: null,
          bottom: bottomOffset
        });
        onStick && onStick(e);
      }
    },
    [onBottom, pushing, bottomOffset]
  );

  const stickToContextTop = React.useCallback(
    e => {
      if (stateRef.current !== "stickToContextTop") {
        stateRef.current = "stickToContextTop";
        onTop && onTop(e);
        pushingRef.current = false;
        setState({
          sticky: false,
          absolute: false,
          top: null,
          bottom: null
        });
        onUnstick && onUnstick(e);
      }
    },
    [onTop]
  );

  const stickToScreenBottom = React.useCallback(
    e => {
      if (stateRef.current !== "stickToScreenBottom") {
        stateRef.current = "stickToScreenBottom";
        setState({
          sticky: true,
          absolute: false,
          top: null,
          bottom: bottomOffset
        });
        onStick && onStick(e);
      }
    },
    [bottomOffset]
  );

  const stickToScreenTop = React.useCallback(
    e => {
      if (stateRef.current !== "stickToScreenTop") {
        stateRef.current = "stickToScreenTop";
        setState({
          sticky: true,
          absolute: false,
          top: offset,
          bottom: null
        });
        onStick && onStick(e);
      }
    },
    [offset]
  );

  return (
    <BaseElement elementName="div" _className_={$.classNames.name} {...other}>
      <BaseElement
        elementName="div"
        {...triggerNodeProps}
        _style_={triggerStyle}
        _refer_={triggerNodeRef}
      />
      <BaseElement
        elementName="div"
        {...contentsProps}
        _style_={style}
        _className_={$.classNames.nameContents}
        _refer_={stickyNodeRef}
      >
        {children}
      </BaseElement>
    </BaseElement>
  );
};

export default Sticky;
