import * as React from "react";
import $ from "./_constants";
import {
  injectElementToRef,
  setTransition,
  setTransform,
  genTransitionProperty,
  genDurations,
  genEasings,
  useForceUpdate,
  addEventListener
} from "scripts";
import { EventListener } from "..";
import { isHorizontal } from "../Drawer/Drawer";
import SwipeArea from "./SwipeArea";
import { Drawer } from "..";

// This value is closed to what browsers are using internally to
// trigger a native scroll.
const UNCERTAINTY_THRESHOLD = 3; // px

// We can only have one node at the time claiming ownership for handling the swipe.
// Otherwise, the UX would be confusing.
// That's why we use a singleton here.
type SwipeInstance = {
  isSwiping: null | boolean;
  startX?: number;
  startY?: number;
  velocity?: number;
  lastTranslate?: null | number;
  lastTime?: null | number;
};
let nodeThatClaimedTheSwipe: null | SwipeInstance = null;

const calculateCurrentX = (
  anchor: $Type.Components.Drawer._Anchor,
  touches: TouchList
): number => {
  return anchor === "right"
    ? document.body.offsetWidth - touches[0].pageX
    : touches[0].pageX;
};

const calculateCurrentY = (
  anchor: $Type.Components.Drawer._Anchor,
  touches: TouchList
): number => {
  return anchor === "bottom"
    ? window.innerHeight - touches[0].clientY
    : touches[0].clientY;
};

const getMaxTranslate = (
  horizontalSwipe: boolean,
  transitionInstance: HTMLElement
): number => {
  return horizontalSwipe
    ? transitionInstance.clientWidth
    : transitionInstance.offsetHeight;
};

const getTranslate = (
  currentTranslate: number,
  startLocation: number,
  open: boolean | undefined,
  maxTranslate: number
): number => {
  return Math.min(
    Math.max(
      open
        ? startLocation - currentTranslate
        : maxTranslate + startLocation - currentTranslate,
      0
    ),
    maxTranslate
  );
};

const touchMoveListenerOption = { passive: false };
const disableSwipeToOpenDefault =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

const preventDefault = (e: Event) => {
  if (e.cancelable) {
    e.preventDefault();
  }
};

type ComponentProps = {
  onOpen: () => void;
  onClose: () => void;
  hysteresis?: number;
  minFlingVelocity?: number;
  disableBackdropTransition?: boolean;
  disableDiscovery?: boolean;
  disableSwipeToOpen?: boolean;
  hideBackdrop?: boolean;
  swipeAreaProps?: $Type.Components.SwipeArea._Props;
  swipeAreaWidth?: number;
};

type DrawerSomeProps = {
  open?: boolean;
  anchor?: $Type.Components.Drawer._Anchor;
  transitionProps?: $Type.Transition.AllProps;
};

// "Type instantiation is excessively deep and possibly infinite.ts(2589)"
// type Props = $Type.MergeObject<ComponentProps, $Type.Components.Drawer._Props>;
type Props = ComponentProps & DrawerSomeProps & $Type.AnyObject;

declare global {
  namespace $Type {
    namespace Components {
      namespace SwipeableDrawer {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const SwipeableDrawer: React.FC<Props> = ({
  children,
  open = false,
  anchor = "left",
  onOpen,
  onClose,
  hysteresis = 0.55,
  minFlingVelocity = 400,
  disableBackdropTransition = false,
  disableDiscovery = false,
  disableSwipeToOpen = disableSwipeToOpenDefault,
  hideBackdrop,
  swipeAreaProps = {},
  swipeAreaWidth = 40,
  transitionProps: propTransitionProps = {},
  ...other
}) => {
  const swipeAreaNodeRef = React.useRef<null | Element>(null);

  const backdropNodeRef = React.useRef<null | HTMLElement>(null);
  const transitionNodeRef = React.useRef<null | HTMLElement>(null);
  const drawerNodeRef = React.useRef<null | HTMLElement>(null);

  const swipeInstanceRef = React.useRef<SwipeInstance>({
    isSwiping: null
  });

  const touchDetected = React.useRef<boolean>(false);
  const openedRef = React.useRef<boolean>(open);

  const removePreventDefaultRef = React.useRef<null | (() => void)>(null);

  const forceSwitchRef = React.useRef<null | boolean>(null);
  const forceUpdate = useForceUpdate();
  const forceSwitch = (open: boolean) => {
    forceSwitchRef.current = open;
    forceUpdate();
  };

  const [durations, easings] = React.useMemo(() => {
    return [
      genDurations(propTransitionProps.duration || $.styles.duration),
      genEasings(propTransitionProps.easing || $.styles.easing)
    ];
  }, [propTransitionProps.duration, propTransitionProps.easing]);

  // Use a ref so the open value used is always up to date inside React.useCallback.
  React.useLayoutEffect(() => {
    openedRef.current = open;
  }, [open]);

  React.useEffect(
    () => () => {
      // We need to release the lock.
      if (nodeThatClaimedTheSwipe === swipeInstanceRef.current) {
        nodeThatClaimedTheSwipe = null;
      }
    },
    []
  );

  const setPosition = React.useCallback(
    (
      translate: number,
      options: {
        mode?: "enter" | "exit" | null;
        changeTransition?: boolean;
      } = {}
    ): void => {
      if (!transitionNodeRef.current) return;
      const { mode = null, changeTransition = true } = options;
      const translateMultiplier =
        ["right", "bottom"].indexOf(anchor) !== -1 ? 1 : -1;
      const horizontalSwipe = isHorizontal(anchor);

      const transform = horizontalSwipe
        ? `translateX(${translateMultiplier * translate}px)`
        : `translateY(${translateMultiplier * translate}px)`;
      setTransform(transitionNodeRef.current, transform);

      let transition = "";

      if (mode) {
        transition = genTransitionProperty([
          {
            property: "all",
            duration: durations[mode],
            easing: easings[mode]
          }
        ]);
      }

      if (changeTransition) {
        setTransition(transitionNodeRef.current, transition);
      }

      if (
        !disableBackdropTransition &&
        !hideBackdrop &&
        backdropNodeRef.current
      ) {
        backdropNodeRef.current.style.opacity = (
          1 -
          translate /
            getMaxTranslate(horizontalSwipe, transitionNodeRef.current)
        ).toString(10);

        if (changeTransition) {
          setTransition(backdropNodeRef.current, transition);
        }
      }
    },
    [anchor, disableBackdropTransition, hideBackdrop, durations, easings]
  );

  const handleBodyTouchStart = React.useCallback(
    event => {
      if (!transitionNodeRef.current) return;
      if (removePreventDefaultRef.current) {
        removePreventDefaultRef.current();
        removePreventDefaultRef.current = null;
      }
      // We are not supposed to handle this touch move.
      if (
        nodeThatClaimedTheSwipe !== null &&
        nodeThatClaimedTheSwipe !== swipeInstanceRef.current
      ) {
        return;
      }

      const horizontalSwipe = isHorizontal(anchor);
      const currentX = calculateCurrentX(anchor, event.touches);
      const currentY = calculateCurrentY(anchor, event.touches);

      if (!openedRef.current) {
        if (disableSwipeToOpen || event.target !== swipeAreaNodeRef.current) {
          return;
        }
        if (horizontalSwipe) {
          if (currentX > swipeAreaWidth) {
            return;
          }
        } else {
          if (currentY > swipeAreaWidth) {
            return;
          }
        }
      }

      swipeInstanceRef.current.startX = currentX;
      swipeInstanceRef.current.startY = currentY;
      // setMaybeSwiping(true);
      if (!openedRef.current) {
        if (drawerNodeRef.current) drawerNodeRef.current.style.visibility = "";
        if (backdropNodeRef.current)
          backdropNodeRef.current.style.visibility = "";

        // The ref may be null when a parent component updates while swiping.
        setPosition(
          getMaxTranslate(horizontalSwipe, transitionNodeRef.current) +
            (disableDiscovery ? 20 : -swipeAreaWidth),
          {
            mode: "enter"
          }
        );
      }

      swipeInstanceRef.current.velocity = 0;
      swipeInstanceRef.current.lastTime = null;
      swipeInstanceRef.current.lastTranslate = null;

      touchDetected.current = true;
      nodeThatClaimedTheSwipe = swipeInstanceRef.current;
    },
    [setPosition, anchor, disableDiscovery, disableSwipeToOpen, swipeAreaWidth]
  );

  const handleBodyTouchEnd = React.useCallback(
    (event: TouchEvent): void => {
      if (!transitionNodeRef.current) return;
      if (!touchDetected.current) return;
      nodeThatClaimedTheSwipe = null;
      touchDetected.current = false;

      // The swipe wasn't started.
      if (!swipeInstanceRef.current.isSwiping) {
        swipeInstanceRef.current.isSwiping = null;
        if (!openedRef.current) {
          removePreventDefaultRef.current = addEventListener(
            document,
            "touchmove",
            preventDefault,
            { passive: false }
          );

          forceSwitch(true);
          forceSwitch(false);
          forceSwitchRef.current = null;
        }
        return;
      }

      swipeInstanceRef.current.isSwiping = null;

      const horizontal = isHorizontal(anchor);

      const current = horizontal
        ? calculateCurrentX(anchor, event.changedTouches)
        : calculateCurrentY(anchor, event.changedTouches);

      const startLocation = horizontal
        ? swipeInstanceRef.current.startX
        : swipeInstanceRef.current.startY;
      const maxTranslate = getMaxTranslate(
        horizontal,
        transitionNodeRef.current
      );
      const currentTranslate = getTranslate(
        current,
        startLocation!,
        openedRef.current,
        maxTranslate
      );
      const translateRatio = currentTranslate / maxTranslate;

      if (openedRef.current) {
        if (
          swipeInstanceRef.current.velocity! > minFlingVelocity ||
          translateRatio > hysteresis
        ) {
          onClose && onClose();
        } else {
          forceSwitch(false);
          forceSwitch(true);
          forceSwitchRef.current = null;
        }

        return;
      }

      if (
        swipeInstanceRef.current.velocity! < -minFlingVelocity ||
        1 - translateRatio > hysteresis
      ) {
        onOpen && onOpen();
      } else {
        forceSwitch(true);
        forceSwitch(false);
        forceSwitchRef.current = null;
      }
    },
    [anchor, hysteresis, minFlingVelocity, onClose, onOpen, setPosition]
  );

  const handleBodyTouchMove = React.useCallback(
    event => {
      // the ref may be null when a parent component updates while swiping
      if (!transitionNodeRef.current || !touchDetected.current) {
        return;
      }

      const horizontalSwipe = isHorizontal(anchor);

      const currentX = calculateCurrentX(anchor, event.touches);
      const currentY = calculateCurrentY(anchor, event.touches);
      // We don't know yet.
      if (swipeInstanceRef.current.isSwiping === null) {
        const dx = Math.abs(currentX - swipeInstanceRef.current.startX!);
        const dy = Math.abs(currentY - swipeInstanceRef.current.startY!);

        // We are likely to be swiping, let's prevent the scroll event on iOS.
        if (dx > dy) {
          preventDefault(event);
        }

        const definitelySwiping = horizontalSwipe
          ? dx > dy && dx > UNCERTAINTY_THRESHOLD
          : dy > dx && dy > UNCERTAINTY_THRESHOLD;

        if (!definitelySwiping) {
          handleBodyTouchEnd(event);
          return;
        } else {
          swipeInstanceRef.current.isSwiping = definitelySwiping;

          transitionNodeRef.current.style.willChange = "transform";
          backdropNodeRef.current!.style.willChange = "opacity";

          // Shift the starting point.
          swipeInstanceRef.current.startX = currentX;
          swipeInstanceRef.current.startY = currentY;

          // Compensate for the part of the drawer displayed on touch start.
          if (!disableDiscovery && !openedRef.current) {
            if (horizontalSwipe) {
              swipeInstanceRef.current.startX -= swipeAreaWidth;
            } else {
              swipeInstanceRef.current.startY -= swipeAreaWidth;
            }
          }
        }
      }

      if (!swipeInstanceRef.current.isSwiping) {
        return;
      }

      // We are swiping, let's prevent the scroll event on iOS.
      preventDefault(event);

      const startLocation = horizontalSwipe
        ? swipeInstanceRef.current.startX
        : swipeInstanceRef.current.startY;
      const maxTranslate = getMaxTranslate(
        horizontalSwipe,
        transitionNodeRef.current
      );

      const translate = getTranslate(
        horizontalSwipe ? currentX : currentY,
        startLocation!,
        openedRef.current,
        maxTranslate
      );

      if (
        !swipeInstanceRef.current.lastTranslate ||
        !swipeInstanceRef.current.lastTime
      ) {
        swipeInstanceRef.current.lastTranslate = translate;
        swipeInstanceRef.current.lastTime = performance.now() + 1;
      }

      const velocity =
        ((translate - swipeInstanceRef.current.lastTranslate) /
          (performance.now() - swipeInstanceRef.current.lastTime)) *
        1e3;
      // Low Pass filter.
      swipeInstanceRef.current.velocity =
        swipeInstanceRef.current.velocity! * 0.4 + velocity * 0.6;

      swipeInstanceRef.current.lastTranslate = translate;
      swipeInstanceRef.current.lastTime = performance.now();

      setPosition(translate);
    },
    [setPosition, handleBodyTouchEnd, anchor, disableDiscovery, swipeAreaWidth]
  );

  const handleBackdropNodeRef = React.useCallback(
    element => {
      backdropNodeRef.current = element;
      injectElementToRef((other.backdropProps || {}).refer, element);
    },
    [(other.backdropProps || {}).refer]
  );
  const handleDrawerNodeRef = React.useCallback(
    element => {
      drawerNodeRef.current = element;
      injectElementToRef(other.refer, element);
    },
    [other.refer]
  );
  const props = {
    ...other,
    ...React.useMemo(() => {
      return {
        refer: handleDrawerNodeRef,
        classNames: [$.classNames.name, ...(other.classNames || [])],
        backdropProps: {
          ...other.backdropProps,
          refer: handleBackdropNodeRef,
          disableEnter: true
        }
      };
    }, [other.classNames, other.backdropProps])
  };

  const handleTransitionEnd = React.useCallback(() => {
    if (transitionNodeRef.current)
      transitionNodeRef.current.style.willChange = "";
    if (backdropNodeRef.current) backdropNodeRef.current.style.willChange = "";
    if (removePreventDefaultRef.current) {
      removePreventDefaultRef.current();
      removePreventDefaultRef.current = null;
    }
  }, []);

  const handleTransitionNodeRef = React.useCallback(
    element => {
      transitionNodeRef.current = element;
      injectElementToRef(propTransitionProps.refer, element);
    },
    [propTransitionProps.refer]
  );
  const transitionProps = {
    ...propTransitionProps,
    ...React.useMemo(() => {
      return {
        refer: handleTransitionNodeRef,
        classNames: [
          $.classNames.nameTransition,
          ...(propTransitionProps.classNames || [])
        ],
        onEntered: (node: HTMLElement, appearing: boolean) => {
          handleTransitionEnd();
          propTransitionProps.onEntered &&
            propTransitionProps.onEntered(node, appearing);
        },
        onExited: (node: HTMLElement) => {
          handleTransitionEnd();
          propTransitionProps.onExited && propTransitionProps.onExited(node);
        },
        disableEnter: true
      };
    }, [
      propTransitionProps.classNames,
      propTransitionProps.onEntered,
      propTransitionProps.onExited
    ])
  };

  const handleSwipeAreaNodeRef = React.useCallback(
    element => {
      swipeAreaNodeRef.current = element;
      injectElementToRef(swipeAreaProps.refer, element);
    },
    [swipeAreaProps.refer]
  );

  return (
    <React.Fragment>
      <EventListener
        target={document.body}
        type="touchstart"
        listener={handleBodyTouchStart}
      />
      <EventListener
        target={document.body}
        type="touchmove"
        listener={handleBodyTouchMove}
        options={touchMoveListenerOption}
      />
      <EventListener
        target={document.body}
        type="touchend"
        listener={handleBodyTouchEnd}
      />
      <Drawer
        {...props}
        open={forceSwitchRef.current === null ? open : forceSwitchRef.current}
        anchor={anchor}
        transitionProps={transitionProps}
        keepMount={true}
        TransitionComponent={undefined}
      >
        {children}
      </Drawer>
      {!disableSwipeToOpen && (
        <SwipeArea
          {...swipeAreaProps}
          anchor={anchor}
          refer={handleSwipeAreaNodeRef}
          width={swipeAreaWidth}
        />
      )}
    </React.Fragment>
  );
};

export default SwipeableDrawer;
