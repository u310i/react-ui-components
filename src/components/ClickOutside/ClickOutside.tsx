import * as React from "react";
import { extractElement, clickedScrollbar } from "scripts";
import EventListener from "../EventListener/EventListener";

type ComponentProps = {
  target?: $Type.ReactUtils.IncludeNode;
  action?: (evt: MouseEvent) => void;
  options?: AddEventListenerOptions;
  scope?: $Type.ReactUtils.IncludeNode;
  includeScrollbar?: boolean;
  ignoreTarget?: boolean;
};

type Props = ComponentProps;

declare global {
  namespace $Type {
    namespace Components {
      namespace ClickOutside {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const ClickOutside: React.FC<Props> = ({
  children,
  target,
  action,
  options,
  scope = document.body,
  // includeScrollbar,
  ignoreTarget
}) => {
  if (!target || !action) return null;

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
      // if (!includeScrollbar && clickedScrollbar(event)) return;
      action(event);
    },
    [action, target]
  );

  return (
    <EventListener
      target={scope}
      type={"click"}
      listener={listener}
      options={options}
    >
      {children}
    </EventListener>
  );
};

export default ClickOutside;
