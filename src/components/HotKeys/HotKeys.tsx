import * as React from "react";
import { extractElement, mousetrap as Mousetrap, raf } from "scripts";

type ComponentProps = {
  hotkeys?: string | string[];
  action?: (evt: KeyboardEvent) => void;
  type?: "keydown" | "keyup" | "keypress";
  target?: $Type.ReactUtils.IncludeNode;
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

/**
 * mousetrap
 * https://github.com/ccampbell/mousetrap
 */
const HotKeys: React.FC<Props> = ({
  children,
  hotkeys,
  action,
  type,
  target: propTarget,
  active = true
}) => {
  if (!hotkeys || !action) return null;

  const mousetrapRef = React.useRef<null | MousetrapStatic | MousetrapInstance>(
    null
  );
  const bindedRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    const target = extractElement(propTarget);
    mousetrapRef.current = target ? Mousetrap(target as Element) : Mousetrap;
  }, [propTarget]);

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
  }, [active, type, propTarget, hotkeys]);

  return <>{children}</>;
};

export default HotKeys;
