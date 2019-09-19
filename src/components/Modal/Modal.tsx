import * as React from 'react';
import $ from './_constants';
import {
  injectElementToRef,
  extractElement,
  useForceUpdate,
  isReactComponentChildren,
  isTransitionComponent,
} from 'scripts';
import {
  Portal,
  HideOtherAria,
  Backdrop,
  FocusTrap,
  HotKeys,
  ClickOutside,
  ScrollLock,
} from '..';

const $names = $.names;
const $styles = $.styles;

type ModalQueueValue = {
  isActive: boolean;
  update: () => void;
};

type ClosingReason = 'escapeKeyDown' | 'outsideClick';

type Props = $Type.ReactUtils.CreateProps<
  {
    container?: Element;
    open?: boolean;
    onClose?: (node: Element | null, reason: ClosingReason | null) => void;
    onOpen?: () => void;
    onEscapeKeyDown?: (evt: KeyboardEvent) => void;
    onOutsideClick?: (evt: MouseEvent) => void;
    keepMount?: boolean;
    closeAfterTransition?: boolean;
    disableEscapeKeyDown?: boolean;
    disableOutsideClick?: boolean;
    disableHideOtherAria?: boolean;
    disableEnforceFocus?: boolean;
    disableRestoreFocus?: boolean;
    disableFallbackFocus?: boolean;
    hideBackdrop?: boolean;
    disableScrollLock?: boolean;
    scrollTarget?: $Type.ReactUtils.IncludeNode<Element>;
    clickOutsideProps?: $Type.ReactUtils.CreatePropComponentProps<
      typeof ClickOutside
    >;
    fallbackFocus?: $Type.ReactUtils.IncludeNode<HTMLElement>;
    contentProps?: $Type.ReactUtils.CreatePropComponentProps<typeof FocusTrap>;
    backdropProps?: $Type.ReactUtils.CreatePropComponentProps<typeof Backdrop>;
  },
  typeof HideOtherAria
>;

const modalQueue: ModalQueueValue[] = [];

let zIndexCounter: number = $styles.modalZindex;

const Modal: React.FC<Props> = ({
  children,
  container,
  open = false,
  onClose,
  onOpen,
  onEscapeKeyDown,
  onOutsideClick,
  keepMount = false,
  closeAfterTransition = true,
  disableEscapeKeyDown = false,
  disableOutsideClick = false,
  disableHideOtherAria = false,
  disableEnforceFocus = false,
  disableRestoreFocus = false,
  disableFallbackFocus = false,
  hideBackdrop = false,
  disableScrollLock = false,
  scrollTarget,
  clickOutsideProps,
  fallbackFocus,
  contentProps: propContentProps = {},
  backdropProps: propBackdropProps = {},
  ...other
}) => {
  if (!children) return null;

  const componentChild = isReactComponentChildren<
    $Type.Transition.PropTransitionComponentCommonProps
  >(children)
    ? children
    : null;

  if (!componentChild) return null;

  const transitionChild =
    closeAfterTransition &&
    componentChild &&
    isTransitionComponent(componentChild!)
      ? componentChild
      : null;

  const rootRef = React.useRef<null | HTMLElement>(null);
  const childRef = React.useRef<null | HTMLElement>(null);
  const prevOpenRef = React.useRef<null | boolean>(null);
  // Use when 'transitionChild' exists.
  const shouldBeMounted = React.useRef<null | boolean>(null);
  // Use when 'transitionChild' exists.
  // It is true until 'open' changes to false and is unmounted.
  const betweenFalseToExitedRef = React.useRef<null | boolean>(null);
  const closingReasonRef = React.useRef<null | ClosingReason>(null);

  const zIndexAdded = React.useRef<null | boolean>(null);
  const activatedRef = React.useRef<boolean>(false);

  const forceUpdate = useForceUpdate();

  const modalManagerRef = React.useRef<ModalQueueValue>({
    isActive: false,
    update: forceUpdate,
  });

  if (open && !activatedRef.current) {
    activatedRef.current = true;
    modalManagerRef.current.isActive = true;
    if (modalQueue.length > 0) {
      const currentModal = modalQueue[modalQueue.length - 1];
      if (modalManagerRef.current !== currentModal) {
        if (currentModal.isActive) {
          currentModal.isActive = false;
          currentModal.update();
        }
      }

      const index = modalQueue.indexOf(modalManagerRef.current);
      if (index === -1) {
        modalQueue.push(modalManagerRef.current);
      } else {
        modalQueue.splice(index, 1);
        modalQueue.push(modalManagerRef.current);
      }
    } else {
      modalQueue.push(modalManagerRef.current);
    }
  }

  if (!open && activatedRef.current) {
    activatedRef.current = false;
    modalManagerRef.current.isActive = false;
    const index = modalQueue.indexOf(modalManagerRef.current);
    if (index !== -1) {
      modalQueue.splice(index, 1);
    }

    if (modalQueue.length > 0) {
      const lastModal = modalQueue[modalQueue.length - 1];
      if (!lastModal.isActive) {
        lastModal.isActive = true;
        lastModal.update();
      }
    } else {
      zIndexCounter = $styles.modalZindex;
      modalQueue.length = 0;
    }
  }

  React.useEffect(() => {
    if (!rootRef.current) return;
    if (open && !zIndexAdded.current) {
      rootRef.current.style.zIndex = zIndexCounter.toString(10);
      zIndexCounter += 1;
    }
    zIndexAdded.current = open;
  }, [open]);

  const handleEscapeKeyDown = React.useCallback(
    event => {
      closingReasonRef.current = 'escapeKeyDown';
      onEscapeKeyDown && onEscapeKeyDown(event);
      event.stopPropagation();
    },
    [onEscapeKeyDown]
  );

  const handleOutsideClick = React.useCallback(
    event => {
      closingReasonRef.current = 'outsideClick';
      onOutsideClick && onOutsideClick(event);
    },
    [onOutsideClick]
  );

  // Make the root element of 'children' or the element of 'fallbackFocus' tabbable.
  const handleFallbackFocus = React.useCallback(() => {
    const fallbackFocusElement = extractElement(fallbackFocus);
    if (fallbackFocusElement) {
      fallbackFocusElement.tabIndex = 0;
      return fallbackFocusElement;
    }
    if (!childRef.current) return null;
    childRef.current.tabIndex = 0;
    return childRef.current;
  }, [fallbackFocus]);

  const handleOpen = React.useCallback(() => {
    onOpen && onOpen();
  }, [open, onOpen]);

  const handleClose = React.useCallback(() => {
    onClose && onClose(childRef.current, closingReasonRef.current);
    closingReasonRef.current = null;
  }, []);

  if (open && !prevOpenRef.current) {
    handleOpen();
    prevOpenRef.current = true;
    if (transitionChild) {
      shouldBeMounted.current = true;
      betweenFalseToExitedRef.current = false;
    }
  } else if (!open && prevOpenRef.current) {
    handleClose();
    prevOpenRef.current = false;
    if (transitionChild) {
      betweenFalseToExitedRef.current = true;
    }
  }

  // Use when 'transitionChild' exists.
  // If you want to unmount after waiting for the transition,
  //  use 'forceUpdate' to unmount after the transition.
  const onExitedOfTransitionChild =
    transitionChild && transitionChild.props.onExited;

  const handleExited = React.useCallback(
    node => {
      betweenFalseToExitedRef.current = false;
      shouldBeMounted.current = false;
      onExitedOfTransitionChild && onExitedOfTransitionChild(node);
      forceUpdate();
    },
    [closeAfterTransition, onExitedOfTransitionChild]
  );

  const handleChildRef = React.useCallback(element => {
    childRef.current = element;
    injectElementToRef(((children as any).props || {}).refer, element);
  }, []);

  let childComponent: React.ReactNode;
  if (transitionChild) {
    childComponent = (
      <transitionChild.type
        {...transitionChild.props}
        onExited={handleExited}
        refer={handleChildRef}
      />
    ) as React.ReactElement<
      $Type.Transition.PropTransitionComponentCommonProps
    >;
  } else {
    childComponent = (
      <componentChild.type {...componentChild.props} refer={handleChildRef} />
    ) as React.ReactElement<any>;
  }

  // 'React.useCallback' is never updated.
  const handleRootRef = React.useCallback(element => {
    rootRef.current = element;
    injectElementToRef(other.refer, element);
  }, []);

  const props = {
    ...other,
    ...React.useMemo(() => {
      return {
        style: {
          ...$styles.container.style,
          ...other.style,
        },
        classNames: [...(other.classNames || []), $names.modal],
        arias: {
          'aria-modal': true,
          ...other.arias,
        },
        refer: handleRootRef,
      };
    }, [other.style, other.classNames, other.arias]),
  };

  const contentProps = {
    ...propContentProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$styles.content.style,
          ...propContentProps.style,
        },
        classNames: [
          ...(propContentProps.classNames || []),
          $names.modalContent,
        ],
      };
    }, [propContentProps.style, propContentProps.classNames]),
  };

  const backdropProps = {
    ...propBackdropProps,
    ...React.useMemo(() => {
      return {
        disableHideVisibility: true,
        style: {
          zIndex: $styles.backdropZindex,
          ...propBackdropProps.style,
        },
        classNames: [
          ...(propBackdropProps.classNames || []),
          $names.modalBackdrop,
        ],
      };
    }, [propBackdropProps.style, propBackdropProps.classNames]),
  };

  const isActive = !!modalManagerRef.current.isActive;

  const isOpen = !transitionChild ? open : !!shouldBeMounted.current;

  React.useEffect(() => {
    if (rootRef.current) {
      rootRef.current.style.visibility = isOpen ? null : 'hidden';
    }
  }, [isOpen]);

  const isMount = keepMount ? true : isOpen;

  return isMount ? (
    <Portal container={container}>
      <HideOtherAria active={!disableHideOtherAria && isActive} {...props}>
        {!disableScrollLock && isOpen && (
          <ScrollLock target={scrollTarget || childRef} />
        )}
        {!disableEscapeKeyDown && isActive && open && (
          <HotKeys hotkeys={'escape'} action={handleEscapeKeyDown} />
        )}
        {!disableOutsideClick && isActive && open && (
          <ClickOutside
            target={childRef}
            action={handleOutsideClick}
            {...clickOutsideProps}
          />
        )}
        {!hideBackdrop && (
          <Backdrop
            open={open}
            disablePointerEvents={!open}
            aria-hidden={true}
            {...backdropProps}
          />
        )}
        <FocusTrap
          active={!disableEnforceFocus && isActive}
          disableRestoreFocus={disableRestoreFocus}
          fallbackFocus={disableFallbackFocus ? undefined : handleFallbackFocus}
          {...contentProps}
        >
          {childComponent}
        </FocusTrap>
      </HideOtherAria>
    </Portal>
  ) : null;
};

export default Modal;
