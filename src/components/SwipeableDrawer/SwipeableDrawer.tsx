import React from 'react';
import $ from './_constants';
import {
  injectElementToRef,
  setTransition,
  setTransform,
  genTransitionProperty,
  genDurations,
  genEasings,
} from 'scripts';
import { EventListener } from '..';
import { isHorizontal } from '../Drawer/Drawer';
import SwipeArea from './SwipeArea';
import { Drawer } from '..';

const $classNames = $.classNames
const $styles = $.styles;

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
  anchor: $Type.Components.DrawerAnchor,
  touches: TouchList
): number => {
  return anchor === 'right'
    ? document.body.offsetWidth - touches[0].pageX
    : touches[0].pageX;
};

const calculateCurrentY = (
  anchor: $Type.Components.DrawerAnchor,
  touches: TouchList
): number => {
  return anchor === 'bottom'
    ? window.innerHeight - touches[0].clientY
    : touches[0].clientY;
};

const getMaxTranslate = (
  horizontalSwipe: boolean,
  transitionInstance: Element
): number => {
  return horizontalSwipe
    ? transitionInstance.clientWidth
    : transitionInstance.clientHeight;
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
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

type Props = $Type.ReactUtils.CreateProps<
  {
    onOpen?: () => void;
    onClose?: () => void;
    hysteresis?: number;
    minFlingVelocity?: number;
    disableBackdropTransition?: boolean;
    disableDiscovery?: boolean;
    disableSwipeToOpen?: boolean;
    hideBackdrop?: boolean;
    swipeAreaProps?: Omit<
      $Type.ReactUtils.CreatePropComponentProps<typeof SwipeArea>,
      'anchor' | 'width'
    >;
    swipeAreaWidth?: number;
  },
  Omit<
    $Type.ReactUtils.CreatePropComponentProps<typeof Drawer>,
    'TransitionComponent' | 'keepMount'
  >
>;

const SwipeableDrawer: React.FC<Props> = ({
  children,
  open,
  anchor = 'left',
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
  const swipeInstance = React.useRef<SwipeInstance>({
    isSwiping: null,
  });
  const swipeAreaRef = React.useRef<null | Element>(null);
  const backdropRef = React.useRef<null | HTMLElement>(null);
  const transitionRef = React.useRef<null | HTMLElement>(null);
  const drawerRef = React.useRef<null | HTMLElement>(null);

  const touchDetected = React.useRef<boolean>(false);
  const openRef = React.useRef(open);

  const abortedTimeoutIdRef = React.useRef<null | number>(null);

  const [durations, easings] = React.useMemo(() => {
    return [
      genDurations(propTransitionProps.duration || $styles.duration),
      genEasings(propTransitionProps.easing || $styles.easing),
    ];
  }, [propTransitionProps.duration, propTransitionProps.easing]);

  // Use a ref so the open value used is always up to date inside React.useCallback.
  React.useLayoutEffect(() => {
    if (open && !openRef.current && abortedTimeoutIdRef.current)
      clearTimeout(abortedTimeoutIdRef.current);
    openRef.current = open;
  }, [open]);

  const setPosition = React.useCallback(
    (
      translate: number,
      options: {
        mode?: 'enter' | 'exit' | null;
        changeTransition?: boolean;
      } = {}
    ): void => {
      if (!transitionRef.current) return;
      const { mode = null, changeTransition = true } = options;
      const translateMultiplier =
        ['right', 'bottom'].indexOf(anchor) !== -1 ? 1 : -1;
      const horizontalSwipe = isHorizontal(anchor);

      const transform = horizontalSwipe
        ? `translateX(${translateMultiplier * translate}px)`
        : `translateY(${translateMultiplier * translate}px)`;
      setTransform(transitionRef.current, transform);

      let transition = '';

      if (mode) {
        transition = genTransitionProperty([
          {
            property: 'all',
            duration: durations[mode],
            easing: easings[mode],
          },
        ]);
      }

      if (changeTransition) {
        setTransition(transitionRef.current, transition);
      }

      if (!disableBackdropTransition && !hideBackdrop && backdropRef.current) {
        backdropRef.current.style.opacity = (
          1 -
          translate / getMaxTranslate(horizontalSwipe, transitionRef.current)
        ).toString(10);

        if (changeTransition) {
          setTransition(backdropRef.current, transition);
        }
      }
    },
    [anchor, disableBackdropTransition, hideBackdrop, durations, easings]
  );

  const setClosedPositionByAborted = React.useCallback((): void => {
    if (!transitionRef.current) return;
    const horizontal = isHorizontal(anchor);

    setPosition(getMaxTranslate(horizontal, transitionRef.current) + 24, {
      mode: 'exit',
    });

    abortedTimeoutIdRef.current = window.setTimeout(() => {
      if (!drawerRef.current) return;
      drawerRef.current.style.visibility = 'hidden';
    }, durations['exit']);
  }, [anchor, durations]);

  const handleBodyTouchEnd = React.useCallback(
    (event: TouchEvent): void => {
      console.log('end');
      if (!touchDetected.current || !transitionRef.current) return;
      nodeThatClaimedTheSwipe = null;
      touchDetected.current = false;
      // setMaybeSwiping(false);

      // The swipe wasn't started.
      if (!swipeInstance.current.isSwiping) {
        swipeInstance.current.isSwiping = null;
        if (!openRef.current) {
          setClosedPositionByAborted();
        }
        return;
      }

      event.stopImmediatePropagation();

      swipeInstance.current.isSwiping = null;

      const horizontal = isHorizontal(anchor);

      const current = horizontal
        ? calculateCurrentX(anchor, event.changedTouches)
        : calculateCurrentY(anchor, event.changedTouches);

      const startLocation = horizontal
        ? swipeInstance.current.startX
        : swipeInstance.current.startY;
      const maxTranslate = getMaxTranslate(horizontal, transitionRef.current);
      const currentTranslate = getTranslate(
        current,
        startLocation!,
        openRef.current,
        maxTranslate
      );
      const translateRatio = currentTranslate / maxTranslate;

      if (openRef.current) {
        if (
          swipeInstance.current.velocity! > minFlingVelocity ||
          translateRatio > hysteresis
        ) {
          onClose && onClose();
        } else {
          // Reset the position, the swipe was aborted.
          setPosition(0, {
            mode: 'enter',
          });
        }

        return;
      }

      if (
        swipeInstance.current.velocity! < -minFlingVelocity ||
        1 - translateRatio > hysteresis
      ) {
        onOpen && onOpen();
      } else {
        // Reset the position, the swipe was aborted.
        setClosedPositionByAborted();
      }
    },
    [anchor, hysteresis, minFlingVelocity, onClose, onOpen, setPosition]
  );

  const handleBodyTouchMove = React.useCallback(
    event => {
      console.log('move');
      // the ref may be null when a parent component updates while swiping
      if (!transitionRef.current || !touchDetected.current) {
        return;
      }

      const horizontalSwipe = isHorizontal(anchor);

      const currentX = calculateCurrentX(anchor, event.touches);
      const currentY = calculateCurrentY(anchor, event.touches);

      // We don't know yet.
      if (swipeInstance.current.isSwiping === null) {
        const dx = Math.abs(currentX - swipeInstance.current.startX!);
        const dy = Math.abs(currentY - swipeInstance.current.startY!);

        // We are likely to be swiping, let's prevent the scroll event on iOS.
        if (dx > dy) {
          if (event.cancelable) {
            event.preventDefault();
          }
        }

        const definitelySwiping = horizontalSwipe
          ? dx > dy && dx > UNCERTAINTY_THRESHOLD
          : dy > dx && dy > UNCERTAINTY_THRESHOLD;

        if (!definitelySwiping) {
          handleBodyTouchEnd(event);
          return;
        }

        if (definitelySwiping) {
          swipeInstance.current.isSwiping = definitelySwiping;

          // Shift the starting point.
          swipeInstance.current.startX = currentX;
          swipeInstance.current.startY = currentY;

          // Compensate for the part of the drawer displayed on touch start.
          if (!disableDiscovery && !openRef.current) {
            if (horizontalSwipe) {
              swipeInstance.current.startX -= swipeAreaWidth;
            } else {
              swipeInstance.current.startY -= swipeAreaWidth;
            }
          }
        }
      }

      if (!swipeInstance.current.isSwiping) {
        return;
      }
      const startLocation = horizontalSwipe
        ? swipeInstance.current.startX
        : swipeInstance.current.startY;
      const maxTranslate = getMaxTranslate(
        horizontalSwipe,
        transitionRef.current
      );

      const translate = getTranslate(
        horizontalSwipe ? currentX : currentY,
        startLocation!,
        openRef.current,
        maxTranslate
      );

      if (
        !swipeInstance.current.lastTranslate ||
        !swipeInstance.current.lastTime
      ) {
        swipeInstance.current.lastTranslate = translate;
        swipeInstance.current.lastTime = performance.now() + 1;
      }

      const velocity =
        ((translate - swipeInstance.current.lastTranslate) /
          (performance.now() - swipeInstance.current.lastTime)) *
        1e3;
      // Low Pass filter.
      swipeInstance.current.velocity =
        swipeInstance.current.velocity! * 0.4 + velocity * 0.6;

      swipeInstance.current.lastTranslate = translate;
      swipeInstance.current.lastTime = performance.now();

      // We are swiping, let's prevent the scroll event on iOS.
      if (event.cancelable) {
        event.preventDefault();
      }
      setPosition(translate);
    },
    [setPosition, handleBodyTouchEnd, anchor, disableDiscovery, swipeAreaWidth]
  );

  const handleBodyTouchStart = React.useCallback(
    event => {
      console.log('start');
      if (!transitionRef.current) return;
      // We are not supposed to handle this touch move.
      if (
        nodeThatClaimedTheSwipe !== null &&
        nodeThatClaimedTheSwipe !== swipeInstance.current
      ) {
        return;
      }

      const horizontalSwipe = isHorizontal(anchor);
      const currentX = calculateCurrentX(anchor, event.touches);
      const currentY = calculateCurrentY(anchor, event.touches);

      if (!openRef.current) {
        if (disableSwipeToOpen || event.target !== swipeAreaRef.current) {
          return;
        }
        if (horizontalSwipe) {
          if (currentX > swipeAreaWidth) {
            return;
          }
        } else if (currentY > swipeAreaWidth) {
          return;
        }
      }

      nodeThatClaimedTheSwipe = swipeInstance.current;
      swipeInstance.current.startX = currentX;
      swipeInstance.current.startY = currentY;
      // setMaybeSwiping(true);
      if (!openRef.current) {
        abortedTimeoutIdRef.current &&
          clearTimeout(abortedTimeoutIdRef.current);
        drawerRef.current && (drawerRef.current.style.visibility = null);

        // The ref may be null when a parent component updates while swiping.
        setPosition(
          getMaxTranslate(horizontalSwipe, transitionRef.current) +
            (disableDiscovery ? 20 : -swipeAreaWidth),
          {
            mode: 'enter',
          }
        );
      }

      swipeInstance.current.velocity = 0;
      swipeInstance.current.lastTime = null;
      swipeInstance.current.lastTranslate = null;

      touchDetected.current = true;
    },
    [setPosition, anchor, disableDiscovery, disableSwipeToOpen, swipeAreaWidth]
  );

  React.useEffect(
    () => () => {
      // We need to release the lock.
      if (nodeThatClaimedTheSwipe === swipeInstance.current) {
        nodeThatClaimedTheSwipe = null;
      }
    },
    []
  );

  const handleBackdropRef = React.useCallback(element => {
    backdropRef.current = element;
    injectElementToRef((other.backdropProps || {}).refer, element);
  }, []);
  const handleDrawerRef = React.useCallback(element => {
    drawerRef.current = element;
    injectElementToRef(other.refer, element);
  }, []);
  const props = {
    hideBackdrop,
    ...other,
    ...React.useMemo(() => {
      return {
        refer: handleDrawerRef,
        classNames: [$classNames.swipeableDrawer, ...(other.classNames || [])],
        backdropProps: {
          ...other.backdropProps,
          refer: handleBackdropRef,
        },
      };
    }, [other.classNames, other.backdropProps]),
  };

  const handleTransitionRef = React.useCallback(element => {
    transitionRef.current = element;
    injectElementToRef(propTransitionProps.refer, element);
  }, []);
  const transitionProps = {
    ...propTransitionProps,
    ...React.useMemo(() => {
      return {
        refer: handleTransitionRef,
        classNames: [
          $.classNames.swipeableDrawerTransition,
          ...(propTransitionProps.classNames || []),
        ],
      };
    }, [propTransitionProps.classNames]),
  };

  const handleSwipeAreaRef = React.useCallback(element => {
    swipeAreaRef.current = element;
    injectElementToRef(swipeAreaProps.refer, element);
  }, []);

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
        open={open}
        transitionProps={transitionProps}
        anchor={anchor}
        {...props}
        keepMount={true}
        TransitionComponent={undefined}
      >
        {children}
      </Drawer>
      {!disableSwipeToOpen && (
        <SwipeArea
          {...swipeAreaProps}
          anchor={anchor}
          refer={handleSwipeAreaRef}
          width={swipeAreaWidth}
        />
      )}
    </React.Fragment>
  );
};

export default SwipeableDrawer;
