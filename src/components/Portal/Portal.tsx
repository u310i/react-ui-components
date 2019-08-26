import * as React from 'react';
import { createPortal } from 'react-dom';

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
  React.useEffect(() => {
    onMount && onMount();
    return () => {
      onUnmount && onUnmount();
    };
  }, []);
  return disablePortal ? (
    <>{children}</>
  ) : (
    createPortal(children, container, key)
  );
};

export default Portal;
