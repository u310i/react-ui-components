import React from 'react';
import { focusTrap as CreateFocusTrap } from './_focusTrap';
import { BaseElement } from '..';

// https://github.com/davidtheclark/focus-trap-react

// We need to hijack the returnFocusOnDeactivate option,
// because React can move focus into the element before we arrived at
// this lifecycle hook (e.g. with autoFocus inputs). So the component
// captures the previouslyFocusedElement in componentWillMount,
// then (optionally) returns focus to it in componentWillUnmount.

type Props = $Type.ReactUtils.CreateProps<
  {
    active?: boolean;
    paused?: boolean;
    onActivate?: () => void;
    onDeactivate?: () => void;
    initialFocus?: $Type.ReactUtils.IncludeNode;
    fallbackFocus?: $Type.ReactUtils.IncludeNode;
    disableRestoreFocus?: boolean;
    disableEscapeKeyDown?: boolean;
    disableOutsideClick?: boolean;
    disablePointerEvents?: boolean;
  },
  typeof BaseElement
>;

const FocusTrap: React.FC<Props> = ({
  children,
  active = true,
  paused = false,
  onActivate,
  onDeactivate,
  initialFocus,
  fallbackFocus,
  disableRestoreFocus = false,
  disableEscapeKeyDown = true,
  disableOutsideClick = true,
  disablePointerEvents = false,
  ...other
}) => {
  const ref = React.useRef<null | HTMLElement>(null);

  const focusTrapOptions = {
    onActivate,
    onDeactivate,
    initialFocus,
    fallbackFocus,
    returnFocusOnDeactivate: false,
    disableEscapeKeyDown,
    disableOutsideClick,
  };

  const focusTrapRef = React.useRef<$Type.Components.FocusTrap.Instance | null>(
    null
  );
  const previouslyFocusedElementRef = React.useRef<HTMLElement | null>(null);
  const prevActiveRef = React.useRef<boolean | null>(null);
  const prevPausedRef = React.useRef<boolean | null>(null);

  const deactivate = React.useCallback((disableRestoreFocus: boolean) => {
    focusTrapRef.current && focusTrapRef.current.deactivate();
    if (
      !disableRestoreFocus &&
      previouslyFocusedElementRef.current &&
      previouslyFocusedElementRef.current.focus
    ) {
      previouslyFocusedElementRef.current.focus();
      previouslyFocusedElementRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (previouslyFocusedElementRef.current === null) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
    }
    if (focusTrapRef.current === null) {
      focusTrapRef.current = CreateFocusTrap(ref.current, focusTrapOptions);
      if (active) focusTrapRef.current.activate();
      if (paused) focusTrapRef.current.pause();
    } else {
      if (prevActiveRef.current && !active) {
        deactivate(disableRestoreFocus);
      } else if (!prevActiveRef.current && active) {
        focusTrapRef.current.activate();
      }

      if (prevPausedRef.current && !paused) {
        focusTrapRef.current.unpause();
      } else if (!prevPausedRef.current && paused) {
        focusTrapRef.current.pause();
      }
    }

    prevActiveRef.current = active;
    prevPausedRef.current = paused;

    return () => {
      deactivate(disableRestoreFocus);
    };
  }, [active, paused]);

  React.useLayoutEffect(() => {
    ref.current!.style.pointerEvents = disablePointerEvents ? 'none' : null;
  }, [disablePointerEvents]);

  return (
    <BaseElement
      elementName="div"
      _className_="uc-focusTrap"
      _refer_={ref}
      {...other}
    >
      {children}
    </BaseElement>
  );
};

export default FocusTrap;
