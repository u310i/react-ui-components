import * as React from 'react';
import { extractElement, scrollLock } from 'scripts';

// https://github.com/willmcpo/body-scroll-lock

type Props = $Type.ReactUtils.CreateProps<{
  target?: $Type.ReactUtils.IncludeNode<Element>;
  active?: boolean;
  fillGap?: boolean;
}>;

const ScrollLock: $Type.ReactUtils.FunctionComponentWithoutChildren<Props> = ({
  target,
  active = true,
  fillGap = true,
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

  return null;
};

export default ScrollLock;
