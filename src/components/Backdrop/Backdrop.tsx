import * as React from "react";
import $ from "./_constants";
import { injectElementToRef } from "scripts";
import { Fade, BaseElement } from "..";

type ComponentProps = {
  open?: boolean;
  disablePointerEvents?: boolean;
  duration?: $Type.Transition.Duration;
  // "Type instantiation is excessively deep and possibly infinite.ts(2589)"
  // TransitionComponent?: React.FC<$Type.Transition.AllProps>;
  TransitionComponent?: React.FC<$Type.AnyObject>;
  innerProps?: $Type.Components.BaseElement._GeneralProps;
};

type Props = $Type.MergeObject<ComponentProps, $Type.Transition.AllProps>;

declare global {
  namespace $Type {
    namespace Components {
      namespace Backdrop {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const Backdrop: React.FC<Props> = ({
  children,
  open = true,
  disablePointerEvents = false,
  duration = $.styles.duration,
  TransitionComponent = Fade,
  innerProps = {},
  ...other
}) => {
  const TransitionNodeRef = React.useRef<null | HTMLElement>(null);

  const handleTransitionNodeRef = React.useCallback(
    (element: Element | null) => {
      TransitionNodeRef.current = element as HTMLElement;
      injectElementToRef(other.refer, element);
    },
    [other.refer]
  );
  const props = {
    ...other,
    ...React.useMemo(() => {
      return {
        style: {
          ...$.styles.style,
          ...other.style
        },
        classNames: [...(other.classNames || []), $.classNames.name],
        refer: handleTransitionNodeRef
      };
    }, [other.style, other.classNames])
  };

  React.useLayoutEffect(() => {
    TransitionNodeRef.current!.style.pointerEvents = disablePointerEvents
      ? "none"
      : null;
  }, [disablePointerEvents]);

  return (
    <TransitionComponent {...props} in={open} duration={duration}>
      <BaseElement
        elementName="div"
        {...innerProps}
        _style_={$.styles.inner.style}
        _className_={$.classNames.nameInner}
      >
        {children}
      </BaseElement>
    </TransitionComponent>
  );
};

export default Backdrop;
