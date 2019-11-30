import * as React from "react";
import { extractElement, mousetrap as Mousetrap, raf } from "scripts";

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
  raf(() => {
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

  const mousetrapRef = React.useRef<null | MousetrapStatic | MousetrapInstance>(
    null
  );
  const bindedRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    const node = extractElement(target);
    mousetrapRef.current = node ? Mousetrap(node) : Mousetrap;
  }, [target]);

  React.useEffect(() => {
    const whichEvent =
      type === "keydown" || type === "keyup" || type === "keypress"
        ? type
        : undefined;

    const mousetrap = mousetrapRef.current;
    if (!mousetrap) return;
    if (active) {
      bindedRef.current && mousetrap.unbind(hotkeys, whichEvent);
      bindAfterUnbind(mousetrap, { hotkeys, action, whichEvent });
      bindedRef.current = true;
    } else {
      if (bindedRef.current) {
        mousetrap.unbind(hotkeys, whichEvent);
        bindedRef.current = false;
      }
    }
    return () => {
      if (bindedRef.current) {
        mousetrap.unbind(hotkeys, whichEvent);
        bindedRef.current = false;
      }
    };
  }, [active, type, target, hotkeys]);

  return <>{children}</>;
};

export default HotKeys;
