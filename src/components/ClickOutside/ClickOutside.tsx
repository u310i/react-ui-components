import React from 'react';
import { extractElement, clickedScrollbar } from 'scripts';
import { EventListener } from '..';

type Props = $Type.ReactUtils.CreateProps<{
  target: $Type.ReactUtils.IncludeNode;
  action: (evt: MouseEvent) => void;
  options?: AddEventListenerOptions;
  scope?: Element;
  includeScrollbar?: boolean;
}>;

const ClickOutside: $Type.ReactUtils.FunctionComponentWithoutChildren<
  Props
> = ({
  target: propTarget,
  action,
  options,
  scope = document.body,
  includeScrollbar = false,
}) => {
  if (!action) return null;
  const listener: EventListener = React.useCallback(
    event => {
      const target = extractElement(propTarget);
      if (!target || (target && target.contains(event.target as Node))) return;
      if (!includeScrollbar && clickedScrollbar(event as MouseEvent)) return;
      action(event as MouseEvent);
    },
    [action, includeScrollbar, propTarget]
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
