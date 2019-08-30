import * as React from 'react';
import { extractElement, scrollLock } from 'scripts';

// https://github.com/willmcpo/body-scroll-lock

type Props = $Type.CreateProps<{
  target?: $Type.IncludeNode<Element>;
  active?: boolean;
  fillGap?: boolean;
}>;

const ScrollLock: React.FC<Props> = ({
  children,
  target,
  active = true,
  fillGap = true,
}) => {
  if (!target) return null;
  const prevActiveRef = React.useRef<null | boolean>(null);

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
  }, [active]);

  return children ? <>{children}</> : null;
};

export default ScrollLock;
