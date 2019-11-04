import React from 'react';
import { injectElementToRef, extractElement, lazyEvent } from 'scripts';
import { BaseElement } from '..';

type Props = $Type.ReactUtils.CreateProps<
  {
    active?: boolean;
    disableAutoFocus?: boolean;
    disableEnforceFocus?: boolean;
    disableRestoreFocus?: boolean;
    initialFocus?: HTMLElement;
  },
  typeof BaseElement
>;

let focusTrapCounter: number = 0;
let firstRestoreNode: null | HTMLElement = null;

const FocusTrap: React.FC<Props> = ({
  children,
  active,
  disableAutoFocus = false,
  disableEnforceFocus = false,
  disableRestoreFocus = false,
  initialFocus,
  ...other
}) => {
  const ignoreNextEnforceFocus = React.useRef<undefined | boolean>();
  const startGuradNodeRef = React.useRef<null | HTMLDivElement>(null);
  const endGuradNodeRef = React.useRef<null | HTMLDivElement>(null);
  const restoreNodeRef = React.useRef<null | HTMLElement>(null);

  const rootNodeRef = React.useRef<HTMLElement | null>(null);

  const handleRootNodeRef = React.useCallback(
    element => {
      rootNodeRef.current = element;
      injectElementToRef(other.refer, element);
    },
    [other.refer]
  );

  React.useEffect(() => {
    if (!active) {
      return;
    }

    ++focusTrapCounter;

    restoreNodeRef.current = document.activeElement as HTMLElement;

    // We might render an empty child.
    if (
      !disableAutoFocus &&
      rootNodeRef.current &&
      !rootNodeRef.current.contains(document.activeElement)
    ) {
      if (!rootNodeRef.current.hasAttribute('tabIndex')) {
        rootNodeRef.current.setAttribute('tabIndex', '-1');
      }

      const initialFocusNode = extractElement(initialFocus);
      if (initialFocusNode && rootNodeRef.current.contains(initialFocusNode)) {
        initialFocusNode.focus();
      } else {
        rootNodeRef.current.focus();
      }
    }

    const contain = () => {
      if (disableEnforceFocus || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }

      if (
        rootNodeRef.current &&
        !rootNodeRef.current.contains(document.activeElement)
      ) {
        rootNodeRef.current.focus();
      }
    };

    const loopFocus = (event: KeyboardEvent) => {
      // 9 = Tab
      if (disableEnforceFocus || event.keyCode !== 9) {
        return;
      }

      // Make sure the next tab starts from the right place.
      if (document.activeElement === rootNodeRef.current) {
        // We need to ignore the next contain as
        // it will try to move the focus back to the rootNodeRef element.
        ignoreNextEnforceFocus.current = true;
        if (event.shiftKey) {
          endGuradNodeRef.current!.focus();
        } else {
          startGuradNodeRef.current!.focus();
        }
      }
    };

    document.addEventListener('focus', contain, true);
    document.addEventListener('keydown', loopFocus, true);

    // With Edge, Safari and Firefox, no focus related events are fired when the focused area stops being a focused area
    // e.g. https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
    //
    // The whatwg spec defines how the browser should behave but does not explicitly mention any events:
    // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.

    const handle = lazyEvent(contain);

    return () => {
      handle();
      document.removeEventListener('focus', contain, true);
      document.removeEventListener('keydown', loopFocus, true);

      // restoreLastFocus()
      if (!disableRestoreFocus) {
        if (!restoreNodeRef.current) return;
        // In IE 11 it is possible for document.activeElement to be null resulting
        // in restoreNodeRef.current being null.
        // Not all elements in IE 11 have a focus method.
        // Once IE 11 support is dropped the focus() call can be unconditional.
        if (focusTrapCounter > 1) {
          if (firstRestoreNode === null) {
            firstRestoreNode = restoreNodeRef.current;
          }
        } else {
          const restoreNode = firstRestoreNode || restoreNodeRef.current;
          if (restoreNode && restoreNode.focus) {
            restoreNode.focus();
          }
          firstRestoreNode = null;
        }
        --focusTrapCounter;
        restoreNodeRef.current = null;
      }
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, active]);

  return (
    <React.Fragment>
      <div tabIndex={0} ref={startGuradNodeRef} className="startFocusGurad" />
      <BaseElement {...other} refer={handleRootNodeRef}>
        {children}
      </BaseElement>
      <div tabIndex={0} ref={endGuradNodeRef} className="endFocusGurad" />
    </React.Fragment>
  );
};

export default FocusTrap;
