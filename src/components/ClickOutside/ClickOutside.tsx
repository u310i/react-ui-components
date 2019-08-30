import React from 'react';
import { extractElement, clickedScrollbar } from 'scripts';
import { EventListener } from '..';

type Props = $Type.CreateProps<{
  target: $Type.IncludeNode;
  action: (evt: MouseEvent) => void;
  options?: AddEventListenerOptions;
  scope?: Element;
  includeScrollbar?: boolean;
}>;

const ClickOutside: React.FC<Props> = ({
  children,
  target,
  action,
  options,
  scope = document.body,
  includeScrollbar = false,
}) => {
  const listener: EventListener = React.useCallback(
    event => {
      const node = extractElement(target);
      if (node && node.contains(event.target as Node)) return;
      if (!includeScrollbar && clickedScrollbar(event as MouseEvent)) return;
      action(event as MouseEvent);
    },
    [action, includeScrollbar, target]
  );

  return (
    <EventListener
      target={scope}
      type={'click'}
      listener={listener}
      options={options}
    >
      {children || null}
    </EventListener>
  );
};

export default ClickOutside;
