import * as React from 'react';
import { createPortal } from 'react-dom';
import { extractElement } from 'scripts';

type Props = $Type.CreateProps<{
  container?: Element;
  key?: any;
  disablePortal?: boolean;
  onMount?: () => void;
  onUnmount?: () => void;
}>;

const Portal: React.FC<Props> = ({
  children,
  container = document.body,
  key,
  disablePortal = false,
  onMount,
  onUnmount,
}) => {
  const containerNode = extractElement(container);
  if (!containerNode) return null;

  React.useEffect(() => {
    onMount && onMount();
    return () => {
      onUnmount && onUnmount();
    };
  }, []);
  return disablePortal ? (
    <>{children}</>
  ) : (
    createPortal(children, containerNode, key)
  );
};

export default Portal;
