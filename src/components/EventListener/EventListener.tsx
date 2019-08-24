import * as React from 'react';
import { getNode, addEventListener, createOptimizedEvent } from 'scripts';

type Props = $Type.CreateProps<{
  target: Element;
  type: string;
  listener: EventListener;
  options?: AddEventListenerOptions;
  optimized?: boolean;
}>;

const EventListener: React.FC<Props> = ({
  children,
  target: propTarget = document,
  type,
  listener,
  options = {},
  optimized = false,
}) => {
  const removeEventListenerRef = React.useRef<null | (() => void)>(null);
  const prevPropsRef = React.useRef<null | Props>(null);

  React.useEffect(() => {
    const target = getNode(propTarget);
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

  return children ? <>children</> : null;
};

export default EventListener;
