import React from 'react';
import { extractElement, clickedScrollbar } from 'scripts';
import { EventListener } from '..';

type Props = $Type.ReactUtils.CreateProps<{
  target: $Type.ReactUtils.IncludeNode;
  action: (evt: MouseEvent) => void;
  options?: AddEventListenerOptions;
  scope?: $Type.ReactUtils.IncludeNode;
  includeScrollbar?: boolean;
  ignoreTarget?: boolean;
}>;

const ClickOutside: $Type.ReactUtils.FunctionComponentWithoutChildren<
  Props
> = ({
  target,
  action,
  options,
  scope = document.body,
  includeScrollbar,
  ignoreTarget,
}) => {
  if (!action) return null;
  const targetNodeRef = React.useRef<null | Node>(null);

  React.useEffect(() => {
    targetNodeRef.current = extractElement<Node>(target);
  }, [target]);

  const listener = React.useCallback(
    (event: MouseEvent): void => {
      if (!targetNodeRef.current) return;
      if (targetNodeRef.current.contains(event.target as Node)) {
        if (ignoreTarget) {
          if (targetNodeRef.current !== event.target) return;
        } else return;
      }
      if (!includeScrollbar && clickedScrollbar(event)) return;
      action(event);
    },
    [action, includeScrollbar, target]
  );

  return (
    <EventListener
      target={scope}
      type={'click'}
      listener={listener}
      options={options}
    />
  );
};

export default ClickOutside;
