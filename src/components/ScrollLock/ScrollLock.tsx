import * as React from "react";
import { extractElement, scrollLock } from "scripts";

// https://github.com/willmcpo/body-scroll-lock

type ComponentProps = {
  target?: $Type.ReactUtils.IncludeNode<Element>;
  active?: boolean;
  fillGap?: boolean;
};

type Props = ComponentProps;

declare global {
  namespace $Type {
    namespace Components {
      namespace ScrollLock {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const ScrollLock: React.FC<Props> = ({
  children,
  target,
  active = true,
  fillGap = true
}) => {
  if (!target) return null;
  const prevActiveRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    const targetElement = extractElement(target);
    if (!targetElement) return;
    if (active && !prevActiveRef.current) {
      scrollLock.lock(targetElement, { reserveScrollBarGap: fillGap });
    }
    if (!active && prevActiveRef.current) {
      scrollLock.restore(targetElement);
    }
    prevActiveRef.current = active;

    return () => {
      scrollLock.restore(targetElement);
    };
  }, [active, fillGap]);

  return <>{children}</>;
};

export default ScrollLock;
