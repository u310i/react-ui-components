import * as React from "react";
import { extractElement, mousetrap as Mousetrap } from "scripts";

// https://github.com/ccampbell/mousetrap

type ComponentProps = {
  hotkeys?: string | string[];
  action?: (evt: KeyboardEvent) => void;
  type?: "keydown" | "keyup" | "keypress";
  target?: Element;
  active?: boolean;
};

type Props = ComponentProps;

declare global {
  namespace $Type {
    namespace Components {
      namespace HotKeys {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const bindAfterUnbind = (
  mousetrap: MousetrapStatic | MousetrapInstance,
  options: {
    hotkeys: Exclude<Props["hotkeys"], undefined>;
    action: Exclude<Props["action"], undefined>;
    whichEvent?: Props["type"];
  }
) => {
  setTimeout(() => {
    mousetrap.bind(options.hotkeys, options.action, options.whichEvent);
  });
};

const HotKeys: React.FC<Props> = ({
  children,
  hotkeys,
  action,
  type,
  target,
  active = true
}) => {
  if (!hotkeys || !action) return null;
  const whichEvent =
    type === "keydown" || type === "keyup" || type === "keypress"
      ? type
      : undefined;

  const mousetrapRef = React.useRef<null | MousetrapStatic | MousetrapInstance>(
    null
  );
  const prevActiveRef = React.useRef<null | boolean>(null);
  const didBindRef = React.useRef<null | boolean>(null);

  React.useEffect(() => {
    if (mousetrapRef.current === null) {
      const node = extractElement(target);
      mousetrapRef.current = node ? Mousetrap(node) : Mousetrap;
    }
    const mousetrap = mousetrapRef.current;
    if (!mousetrap) return;
    if (!prevActiveRef.current && active) {
      bindAfterUnbind(mousetrap, { hotkeys, action, whichEvent });
      didBindRef.current = true;
    } else if (prevActiveRef.current && !active) {
      if (didBindRef.current) {
        didBindRef.current && mousetrap.unbind(hotkeys, whichEvent);
        didBindRef.current = null;
      }
    }
    prevActiveRef.current = active;
    return () => {
      if (didBindRef.current) {
        mousetrap.unbind(hotkeys, whichEvent);
        didBindRef.current = null;
      }
    };
  }, [active]);

  return <>{children}</>;
};

export default HotKeys;
