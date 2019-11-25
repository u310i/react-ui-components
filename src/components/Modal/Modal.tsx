import * as React from "react";
import $ from "./_constants";
import {
  injectElementToRef,
  useForceUpdate,
  isReactComponentChildren,
  isTransitionComponent
} from "scripts";
import {
  Portal,
  HideOtherAria,
  Backdrop,
  FocusTrap,
  HotKeys,
  ClickOutside,
  ScrollLock
} from "..";

type ModalQueueValue = {
  isActive: boolean;
  update: () => void;
};

type ComponentProps = {
  container?: Element;
  open?: boolean;
  onChanged?: (willExist: boolean, node: HTMLElement | null) => void;
  onEscapeKeyDown?: (evt: KeyboardEvent) => void;
  onOutsideClick?: (evt: MouseEvent) => void;
  keepMount?: boolean;
  ignoreTransition?: boolean;
  disableEscapeKeyDown?: boolean;
  disableOutsideClick?: boolean;
  disableHideOtherAria?: boolean;
  hideBackdrop?: boolean;
  disableResetScroll?: boolean;
  disableScrollLock?: boolean;
  scrollTarget?: $Type.ReactUtils.IncludeNode<Element>;
  clickOutsideProps?: $Type.Components.ClickOutside._Props;
  contentsProps?: $Type.Components.FocusTrap._Props;
  backdropProps?: $Type.Components.Backdrop._Props;
};

type Props = $Type.MergeObject<
  ComponentProps,
  $Type.Components.HideOtherAria._Props
>;

declare global {
  namespace $Type {
    namespace Components {
      namespace Modal {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const modalQueue: ModalQueueValue[] = [];

let zIndexCounter: number = $.styles.modalZindex;

const Modal: React.FC<Props> = ({
  children,
  container = document.body,
  open = false,
  onChanged,
  onEscapeKeyDown,
  onOutsideClick,
  keepMount = false,
  ignoreTransition = false,
  disableEscapeKeyDown = false,
  disableOutsideClick = false,
  disableHideOtherAria = false,
  hideBackdrop = false,
  disableResetScroll = false,
  disableScrollLock = false,
  scrollTarget,
  clickOutsideProps,
  contentsProps: propContentProps = {},
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
    !ignoreTransition &&
    componentChild &&
    isTransitionComponent(componentChild!)
      ? componentChild
      : null;

  const rootNodeRef = React.useRef<null | HTMLElement>(null);
  const childNodeRef = React.useRef<null | HTMLElement>(null);

  const prevOpenRef = React.useRef<null | boolean>(null);
  // Use when 'transitionChild' exists.
  const willExistOnTransitionRef = React.useRef<null | boolean>(null);
  // Use when 'transitionChild' exists.
  // It is true until 'open' changes to false and is unmounted.
  const untilClosingRef = React.useRef<null | boolean>(null);

  const activatedRef = React.useRef<boolean>(false);

  const forceUpdate = useForceUpdate();

  const modalManagerRef = React.useRef<ModalQueueValue>({
    isActive: false,
    update: forceUpdate
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
      zIndexCounter = $.styles.modalZindex;
      modalQueue.length = 0;
    }
  }

  if (open && !prevOpenRef.current) {
    prevOpenRef.current = true;
    if (transitionChild) {
      willExistOnTransitionRef.current = true;
      untilClosingRef.current = false;
    }
  } else if (!open && prevOpenRef.current) {
    prevOpenRef.current = false;
    if (transitionChild) {
      untilClosingRef.current = true;
    }
  }

  const isActive = !!modalManagerRef.current.isActive;

  const willExist = !transitionChild
    ? open
    : !!willExistOnTransitionRef.current;

  React.useEffect(() => {
    const isExist = willExist;
    if (rootNodeRef.current) {
      rootNodeRef.current.style.visibility = isExist ? "" : "hidden";
    }
    if (!disableResetScroll) {
      if (childNodeRef.current!.children[0])
        childNodeRef.current!.children[0].scrollTop = 0;
      childNodeRef.current!.parentElement!.scrollTop = 0;
    }
    onChanged && onChanged(isExist, rootNodeRef.current || null);
  }, [willExist]);

  React.useEffect(() => {
    if (open) {
      rootNodeRef.current!.style.zIndex = zIndexCounter.toString(10);
      ++zIndexCounter;
    }
  }, [open]);

  const handleEscapeKeyDown = React.useCallback(
    event => {
      onEscapeKeyDown && onEscapeKeyDown(event);
      event.stopPropagation();
    },
    [onEscapeKeyDown]
  );

  const handleOutsideClick = React.useCallback(
    event => {
      onOutsideClick && onOutsideClick(event);
      event.stopPropagation();
    },
    [onOutsideClick]
  );

  // Use when 'transitionChild' exists.
  // If you want to unmount after waiting for the transition,
  //  use 'forceUpdate' to unmount after the transition.
  const handleTransitionExited = React.useCallback(
    node => {
      untilClosingRef.current = false;
      willExistOnTransitionRef.current = false;
      transitionChild &&
        transitionChild.props.onExited &&
        transitionChild.props.onExited(node);
      forceUpdate();
    },
    [ignoreTransition, transitionChild]
  );

  const handleChildNodeRef = React.useCallback(
    element => {
      childNodeRef.current = element;
      injectElementToRef(((children as any).props || {}).refer, element);
    },
    [((children as any).props || {}).refer]
  );

  let childComponent: React.ReactNode;
  if (transitionChild) {
    childComponent = (
      <transitionChild.type
        {...transitionChild.props}
        onExited={handleTransitionExited}
        refer={handleChildNodeRef}
      />
    ) as React.ReactElement<
      $Type.Transition.PropTransitionComponentCommonProps
    >;
  } else {
    childComponent = (
      <componentChild.type
        {...componentChild.props}
        refer={handleChildNodeRef}
      />
    ) as React.ReactElement<any>;
  }

  // 'React.useCallback' is never updated.
  const handleRootNodeRef = React.useCallback(
    element => {
      rootNodeRef.current = element;
      injectElementToRef(other.refer, element);
    },
    [other.refer]
  );

  const props = {
    ...other,
    ...React.useMemo(() => {
      return {
        style: {
          ...$.styles.container.style,
          ...other.style
        },
        classNames: [...(other.classNames || []), $.classNames.name],
        arias: {
          "aria-modal": true,
          ...other.arias
        },
        refer: handleRootNodeRef
      };
    }, [other.style, other.classNames, other.arias])
  };

  const contentsProps = {
    ...propContentProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$.styles.contents.style,
          ...propContentProps.style
        },
        classNames: [
          ...(propContentProps.classNames || []),
          $.classNames.nameContent
        ]
      };
    }, [propContentProps.style, propContentProps.classNames])
  };

  const backdropProps = {
    ...propBackdropProps,
    ...React.useMemo(() => {
      return {
        style: {
          zIndex: $.styles.backdropZindex,
          ...propBackdropProps.style
        },
        classNames: [
          ...(propBackdropProps.classNames || []),
          $.classNames.nameBackdrop
        ]
      };
    }, [propBackdropProps.style, propBackdropProps.classNames])
  };

  const isMount = keepMount ? true : willExist;

  return isMount ? (
    <Portal container={container}>
      <HideOtherAria
        {...props}
        active={!disableHideOtherAria && isActive}
        parent={container}
      >
        {!disableScrollLock && willExist && (
          <ScrollLock target={scrollTarget || childNodeRef} />
        )}
        {!disableEscapeKeyDown && isActive && open && (
          <HotKeys hotkeys={"escape"} action={handleEscapeKeyDown} />
        )}
        {!disableOutsideClick && isActive && open && (
          <ClickOutside
            {...clickOutsideProps}
            target={childNodeRef}
            action={handleOutsideClick}
            scope={rootNodeRef}
          />
        )}
        {!hideBackdrop && (
          <Backdrop
            disablePointerEvents={true}
            aria-hidden={true}
            {...backdropProps}
            open={open}
          />
        )}
        <FocusTrap {...contentsProps} active={isActive}>
          {childComponent}
        </FocusTrap>
      </HideOtherAria>
    </Portal>
  ) : null;
};

export default Modal;
