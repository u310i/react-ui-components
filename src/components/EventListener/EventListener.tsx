import * as React from "react";
import { extractElement, addEventListener } from "scripts";

type ComponentProps = {
  target?: $Type.ReactUtils.IncludeNode<EventTarget>;
  type: string;
  listener: (evt: any) => void;
  options?: AddEventListenerOptions;
  optimized?: boolean;
};

type Props = ComponentProps;

declare global {
  namespace $Type {
    namespace Components {
      namespace EventListener {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const EventListener: React.FC<Props> = ({
  children,
  target: propTarget = document,
  type,
  listener,
  options = {},
  optimized = false
}) => {
  if (!type || !listener) return null;
  const removeEventListenerRef = React.useRef<null | (() => void)>(null);
  const initedRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    const target = extractElement(propTarget);
    if (!target) return;

    if (!initedRef.current) {
      initedRef.current = true;
      removeEventListenerRef.current = addEventListener(
        target,
        type,
        listener,
        options,
        optimized
      );
    } else {
      removeEventListenerRef.current && removeEventListenerRef.current();
      removeEventListenerRef.current = addEventListener(
        target,
        type,
        listener,
        options,
        optimized
      );
    }

    return () => {
      removeEventListenerRef.current && removeEventListenerRef.current();
    };
  }, [
    propTarget,
    type,
    listener,
    options.capture,
    options.once,
    options.passive,
    optimized
  ]);

  return <>{children}</>;
};

export default EventListener;
