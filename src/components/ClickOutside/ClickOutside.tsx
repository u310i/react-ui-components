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
  active?: boolean;
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
  target: propTarget,
  action,
  options,
  scope = document.body,
  // includeScrollbar,
  ignoreTarget,
  active = true
}) => {
  if (!propTarget || !action) return null;

  const targetNodeRef = React.useRef<null | Node>(null);

  React.useEffect(() => {
    targetNodeRef.current = extractElement<Node>(propTarget);
  }, [propTarget]);

  const listener = React.useCallback(
    (event: MouseEvent): void => {
      const target = targetNodeRef.current;
      if (!target) return;
      if (target.contains(event.target as Node)) {
        if (ignoreTarget) {
          if (target !== event.target) return;
        } else {
          return;
        }
      }
      // if (!includeScrollbar && clickedScrollbar(event)) return;
      action(event);
    },
    [action, propTarget, ignoreTarget]
  );

  return active ? (
    <EventListener
      target={scope}
      type={"click"}
      listener={listener}
      options={options}
    >
      {children}
    </EventListener>
  ) : null;
};

export default ClickOutside;
