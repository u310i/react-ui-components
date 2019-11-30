import * as React from "react";
import $ from "./_constants";
import {
  injectElementToRef,
  useForceUpdate,
  isReactComponentChildren,
  isTransitionComponent,
  deeplyChildren
} from "scripts";
import Portal from "../Portal/Portal";
import BaseElement from "../BaseElement/BaseElement";
import HideOtherAria from "../HideOtherAria/HideOtherAria";
import Backdrop from "../Backdrop/Backdrop";
import FocusTrap from "../FocusTrap/FocusTrap";
import HotKeys from "../HotKeys/HotKeys";
import ClickOutside from "../ClickOutside/ClickOutside";
import ScrollLock from "../ScrollLock/ScrollLock";

type ModalQueueValue = {
  isActive: boolean;
  update: () => void;
};

type ComponentProps = {
  container?: Element;
  open?: boolean;
  onChanged?: (betweenOpenAndExited: boolean, node: HTMLElement | null) => void;
  onEscapeKeyDown?: (evt: KeyboardEvent) => void;
  onOutsideClick?: (evt: MouseEvent) => void;
  keepMount?: boolean;
  disableEscapeKeyDown?: boolean;
  disableOutsideClick?: boolean;
  disableHideOtherAria?: boolean;
  disableBackdrop?: boolean;
  disableResetScroll?: boolean;
  resetScrollDepth?: number;
  disableScrollLock?: boolean;
  scrollTarget?: $Type.ReactUtils.IncludeNode<Element>;
  clickOutsideProps?: $Type.Components.ClickOutside._Props;
  contentsProps?: $Type.Components.FocusTrap._Props;
  innerProps?: $Type.Components.BaseElement._GeneralProps;
  backdropProps?: $Type.Components.Backdrop._Props;
  hideOtherAriaProps?: $Type.Components.HideOtherAria._Props;
};

type Props = $Type.MergeObject<
  ComponentProps,
  $Type.Components.BaseElement._GeneralProps
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

export const Modal: React.FC<Props> = ({
  children,
  container = document.body,
  open = false,
  onChanged,
  onEscapeKeyDown,
  onOutsideClick,
  keepMount = false,
  disableEscapeKeyDown = false,
  disableOutsideClick = false,
  disableHideOtherAria = false,
  disableBackdrop = false,
  disableResetScroll = false,
  resetScrollDepth = $.styles.resetScrollDepth,
  disableScrollLock = false,
  scrollTarget,
  clickOutsideProps,
  contentsProps: propModalContentProps = {},
  innerProps = {},
  backdropProps: propBackdropProps = {},
  hideOtherAriaProps = {},
  ...other
}) => {
  if (!children) return null;

  const componentChild = isReactComponentChildren<
    $Type.Transition.PropTransitionComponentCommonProps
  >(children)
    ? children
    : null;

  if (!componentChild) return null;

  const isTransitionChild =
    componentChild && isTransitionComponent(componentChild);

  const rootNodeRef = React.useRef<null | HTMLElement>(null);
  const innerNodeRef = React.useRef<null | HTMLElement>(null);

  const prevOpenRef = React.useRef<null | boolean>(null);
  // Use when 'isTransitionChild' exists.
  const betweenOpenAndExitedOnTransitionRef = React.useRef<null | boolean>(
    null
  );
  // Use when 'isTransitionChild' exists.
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
    if (isTransitionChild) {
      betweenOpenAndExitedOnTransitionRef.current = true;
      untilClosingRef.current = false;
    }
  } else if (!open && prevOpenRef.current) {
    prevOpenRef.current = false;
    if (isTransitionChild) {
      untilClosingRef.current = true;
    }
  }

  const isActive = !!modalManagerRef.current.isActive;

  const betweenOpenAndExited = isTransitionChild
    ? !!betweenOpenAndExitedOnTransitionRef.current
    : open;

  React.useEffect(() => {
    if (rootNodeRef.current) {
      rootNodeRef.current.style.visibility = betweenOpenAndExited
        ? ""
        : "hidden";
    }
    if (!disableResetScroll && !betweenOpenAndExited) {
      if (innerNodeRef.current) {
        innerNodeRef.current.parentElement &&
          (innerNodeRef.current.parentElement.scrollTop = 0);

        deeplyChildren(
          innerNodeRef.current,
          (child: Element) => {
            child && child.scrollTop && (child.scrollTop = 0);
          },
          resetScrollDepth
        );
      }
    }
    onChanged && onChanged(betweenOpenAndExited, rootNodeRef.current || null);
  }, [betweenOpenAndExited]);

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

  // Use when 'isTransitionChild' true.
  // If you want to unmount after waiting for the transition,
  //  use 'forceUpdate' to unmount after the transition.
  const handleTransitionExited = React.useCallback(
    node => {
      untilClosingRef.current = false;
      betweenOpenAndExitedOnTransitionRef.current = false;
      isTransitionChild &&
        componentChild.props &&
        componentChild.props.onExited &&
        componentChild.props.onExited(node);
      forceUpdate();
    },
    [isTransitionChild]
  );

  const childComponent = isTransitionChild ? (
    <componentChild.type
      {...componentChild.props}
      onExited={handleTransitionExited}
    />
  ) : (
    componentChild
  );

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
        }
      };
    }, [other.style, other.classNames, other.arias])
  };

  const contentsProps = {
    ...propModalContentProps,
    ...React.useMemo(() => {
      return {
        style: {
          ...$.styles.contents.style,
          ...propModalContentProps.style
        },
        classNames: [
          ...(propModalContentProps.classNames || []),
          $.classNames.nameContent
        ]
      };
    }, [propModalContentProps.style, propModalContentProps.classNames])
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

  const isMount = keepMount ? true : betweenOpenAndExited;

  return isMount ? (
    <Portal container={container}>
      <HideOtherAria
        {...hideOtherAriaProps}
        target={rootNodeRef}
        active={!disableHideOtherAria && isActive}
        parent={container}
      />
      <BaseElement elementName="div" {...props} refer={handleRootNodeRef}>
        {!disableScrollLock && betweenOpenAndExited && (
          <ScrollLock target={scrollTarget || innerNodeRef} />
        )}
        {!disableEscapeKeyDown && isActive && open && (
          <HotKeys hotkeys={"escape"} action={handleEscapeKeyDown} />
        )}
        {!disableOutsideClick && isActive && open && (
          <ClickOutside
            target={innerNodeRef}
            {...clickOutsideProps}
            action={handleOutsideClick}
            scope={rootNodeRef}
          />
        )}
        {!disableBackdrop && (
          <Backdrop
            disablePointerEvents={true}
            aria-hidden={true}
            {...backdropProps}
            open={open}
          />
        )}
        <FocusTrap {...contentsProps} active={isActive}>
          <BaseElement
            elementName="div"
            {...innerProps}
            _className_={$.classNames.nameContentInner}
            _refer_={innerNodeRef}
          >
            {childComponent}
          </BaseElement>
        </FocusTrap>
      </BaseElement>
    </Portal>
  ) : null;
};

export default Modal;
