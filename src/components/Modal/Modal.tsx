import * as React from 'react';
import $ from './_constants';
import {
  injectElementToRef,
  extractElement,
  useForceUpdate,
  isReactFunctionalComponentChildren,
  isTransitionComponent,
} from 'scripts';
import {
  BaseElement,
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
  isActive: null | boolean;
  update: () => void;
};

type ClosingReason = 'escapeKeyDown' | 'outsideClick';

type Props = $Type.ReactUtils.CreateProps<{
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
  scrollTarget?: Element;
  clickOutsideProps?: $Type.ReactUtils.PropComponentProps<typeof ClickOutside>;
  fallbackFocus?: $Type.ReactUtils.IncludeNode<HTMLElement>;
  rootProps?: $Type.ReactUtils.PropComponentProps<typeof HideOtherAria>;
  contentProps?: $Type.ReactUtils.PropComponentProps<typeof FocusTrap>;
  backdropProps?: $Type.ReactUtils.PropComponentProps<typeof Backdrop>;
}>;

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
  closeAfterTransition = false,
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
  rootProps: propRootProps = {},
  contentProps: propContentProps = {},
  backdropProps: propBackdropProps = {},
}) => {
  if (!children) return null;
  const transitionChild =
    isReactFunctionalComponentChildren<
      $Type.Transition.PropTransitionComponentProps
    >(children) && isTransitionComponent(children)
      ? children
      : null;

  const rootRef = React.useRef<null | HTMLElement>(null);
  const childRef = React.useRef<null | HTMLElement>(null);
  // Becomes true if 'open' is true,
  //  It will be false when the end transition is exited.
  const shouldBeMounted = React.useRef<null | boolean>(null);
  const closingReasonRef = React.useRef<null | ClosingReason>(null);
  // It is true until 'open' changes to false and is unmounted.
  const inExitTransitionRef = React.useRef<null | true>(null);
  const zIndexAdded = React.useRef<null | boolean>(null);
  const isActivatedRef = React.useRef<null | true>(null);

  const forceUpdate = useForceUpdate();

  // A session to manage multiple modals.
  const modalManagerRef = React.useRef<ModalQueueValue>({
    isActive: null,
    update: forceUpdate,
  });

  if (open && !isActivatedRef.current) {
    isActivatedRef.current = true;
    modalManagerRef.current.isActive = true;
    if (modalQueue.length > 0) {
      const currentModal = modalQueue[modalQueue.length - 1];
      if (modalManagerRef.current !== currentModal) {
        if (currentModal.isActive) {
          currentModal.isActive = null;
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

  if (!open && isActivatedRef.current) {
    isActivatedRef.current = null;
    modalManagerRef.current.isActive = null;
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
    }
  }

  React.useEffect(() => {
    if (open && !zIndexAdded.current) {
      if (!rootRef.current) return;
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

  // If you can't find tabbable elements in your children,
  //  set the substitute element to 'tabIndex = 0' and focus
  const handleFallbackFocus = React.useCallback(() => {
    if (fallbackFocus) {
      const element = extractElement(fallbackFocus);
      if (!element) return null;
      element.tabIndex = 0;
      return element;
    }
    if (!childRef.current) return null;
    childRef.current.tabIndex = 0;
    return childRef.current;
  }, [fallbackFocus]);

  // If you want to unmount after waiting for the transition,
  //  use 'forceUpdate' to unmount after the transition.

  const onExitedOfChildren = transitionChild && transitionChild.props.onExited;
  const handleExited = React.useCallback(
    node => {
      if (closeAfterTransition) {
        inExitTransitionRef.current = null;
        shouldBeMounted.current = null;
        onExitedOfChildren && onExitedOfChildren(node);
        forceUpdate();
      }
    },
    [closeAfterTransition, onExitedOfChildren]
  );

  const handleOpen = React.useCallback(() => {
    shouldBeMounted.current = open;
    inExitTransitionRef.current = null;
    onOpen && onOpen();
  }, [open, onOpen]);

  const handleClose = React.useCallback(() => {
    onClose && onClose(childRef.current, closingReasonRef.current);
    closingReasonRef.current = null;
  }, []);

  // when 'open' changes to false.
  if (shouldBeMounted.current && !open && !inExitTransitionRef.current) {
    inExitTransitionRef.current = true;
    handleClose();
  }

  const enableCloseAfterTransition = transitionChild && closeAfterTransition;

  // If you want to wait for the transition and then unmount,
  //  the procedure is as usual when 'open' changes to true.
  if (enableCloseAfterTransition) {
    if (!shouldBeMounted.current && open) {
      handleOpen();
    }
  } else {
    handleOpen();
  }

  const handleChildRef = React.useCallback(element => {
    childRef.current = element;
    injectElementToRef(transitionChild && transitionChild.props.refer, element);
  }, []);

  const TransitionComponent = transitionChild && transitionChild.type;
  const childComponent = TransitionComponent ? (
    <TransitionComponent
      {...transitionChild!.props}
      onExited={
        enableCloseAfterTransition
          ? handleExited
          : transitionChild!.props.onExited
      }
      refer={handleChildRef}
    />
  ) : (
    children
  );

  // 'React.useCallback' is never updated.
  const handleRootRef = React.useCallback(element => {
    rootRef.current = element;
    injectElementToRef(propRootProps.refer, element);
  }, []);
  // The reason for not putting 'propRootProps' in 'React.useMemo' is to reflect the change of 'propRootProps'.
  // If you put it in 'React.useMemo', you need to add all the properties of 'propRootProps' to 'dependencies'.
  const rootProps = {
    ...propRootProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$styles.container.style,
          ...propRootProps.style,
        },
        classNames: [...(propRootProps.classNames || []), $names.modal],
        refer: handleRootRef,
      };
    }, [propRootProps.style, propRootProps.classNames]),
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

  const propBackdropPropsTransitionProps =
    propBackdropProps.transitionProps || {};
  const backdropProps = {
    ...propBackdropProps,
    ...React.useMemo(() => {
      return {
        transitionProps: {
          disableHideVisibility: true,
          ...propBackdropPropsTransitionProps,
          style: {
            zIndex: $styles.backdropZindex,
            ...propBackdropPropsTransitionProps.style,
          },
          classNames: [
            ...(propBackdropPropsTransitionProps.classNames || []),
            $names.modalBackdrop,
          ],
        },
      };
    }, [propBackdropProps.classNames, propBackdropProps.transitionProps]),
  };

  React.useEffect(() => {
    if (rootRef.current) {
      if (shouldBeMounted.current) {
        rootRef.current.style.visibility = null;
      } else {
        rootRef.current.style.visibility = 'hidden';
      }
    }
  }, [shouldBeMounted.current]);

  const isActive = modalManagerRef.current.isActive;

  return keepMount || shouldBeMounted.current ? (
    <Portal container={container}>
      <HideOtherAria
        active={disableHideOtherAria && (isActive as boolean)}
        {...rootProps}
      >
        {!disableScrollLock && shouldBeMounted.current && (
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
            {...backdropProps}
          />
        )}
        {disableEnforceFocus ? (
          <BaseElement elementName="div" {...contentProps}>
            {childComponent}
          </BaseElement>
        ) : (
          <FocusTrap
            active={disableEnforceFocus && isActive}
            disableRestoreFocus={disableRestoreFocus}
            fallbackFocus={
              disableFallbackFocus ? undefined : handleFallbackFocus
            }
            {...contentProps}
          >
            {childComponent}
          </FocusTrap>
        )}
      </HideOtherAria>
    </Portal>
  ) : null;
};

export default Modal;
