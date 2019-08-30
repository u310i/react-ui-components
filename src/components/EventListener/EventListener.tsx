import * as React from 'react';
import { extractElement, addEventListener } from 'scripts';

type Props = $Type.CreateProps<{
  target?: $Type.IncludeNode;
  type?: string;
  listener?: EventListener;
  options?: AddEventListenerOptions;
  optimized?: boolean;
}>;

declare global {
  namespace $Type {
    namespace Components {
      type EventListenerProps = Props;
    }
  }
}

const EventListener: React.FC<Props> = ({
  children,
  target: propTarget = document,
  type,
  listener,
  options = {},
  optimized = false,
}) => {
  if (!type || !listener) return null;
  const removeEventListenerRef = React.useRef<null | (() => void)>(null);
  const prevPropsRef = React.useRef<null | Props>(null);

  React.useEffect(() => {
    const target = extractElement(propTarget);
    if (!target) return;

    if (prevPropsRef.current) {
      const changedScope = target !== prevPropsRef.current.target;
      const changedType = type !== prevPropsRef.current.type;
      const changedListener = listener !== prevPropsRef.current.listener;
      const prevOptions = prevPropsRef.current.options;

      const changedOptions =
        options &&
        prevOptions &&
        (options.capture !== prevOptions.capture ||
          options.once !== prevOptions.once ||
          options.passive !== prevOptions.passive);

      const changedOptimized = optimized !== prevPropsRef.current.optimized;

      if (
        changedScope ||
        changedType ||
        changedListener ||
        changedOptions ||
        changedOptimized
      ) {
        removeEventListenerRef.current && removeEventListenerRef.current();
        removeEventListenerRef.current = addEventListener(
          target,
          type,
          listener,
          options,
          optimized
        );
      }
    } else {
      removeEventListenerRef.current = addEventListener(
        target,
        type,
        listener,
        options,
        optimized
      );
    }

    prevPropsRef.current = {
      target,
      type,
      listener,
      options: options,
      optimized,
    };

    return () => {
      removeEventListenerRef.current && removeEventListenerRef.current();
    };
  }, [propTarget, type, listener, options, optimized]);

  return children ? <>{children}</> : null;
};

export default EventListener;
