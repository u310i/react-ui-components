import React from 'react';
import { getNode } from 'scripts';
import { BaseElement } from '..';

type Props = $Type.CreateProps<
  {
    parent: Element;
    active?: boolean;
  },
  typeof BaseElement
>;

const HideOtherAria: React.FC<Props> = ({
  children,
  parent = document.body,
  active = true,
  ...other
}) => {
  const _ref_ = React.useRef<null | Element>(null);
  const hiddenNodesRef = React.useRef<Element[]>([]);
  const prevActiveRef = React.useRef<null | boolean>(null);

  const activate = React.useCallback(
    parent => {
      if (_ref_.current === parent || parent.children.length === 0) return;

      Array.from(parent.children, (childNode: Element) => {
        if (childNode.contains(_ref_.current)) {
          activate(childNode);
        } else {
          const attr = childNode.getAttribute('aria-hidden');
          const alreadyHidden = attr !== null && attr !== 'false';

          if (!alreadyHidden) {
            hiddenNodesRef.current.push(childNode);
            childNode.setAttribute('aria-hidden', 'true');
          }
        }
      });
    },
    [active]
  );

  const deactivate = React.useCallback(() => {
    hiddenNodesRef.current.forEach(node => {
      node.removeAttribute('aria-hidden');
    });
    hiddenNodesRef.current = [];
  }, []);

  React.useEffect(() => {
    if (!prevActiveRef.current && active) {
      const parentElement = getNode(parent);
      activate(parentElement);
    } else if (prevActiveRef.current && !active) {
      deactivate();
    }
    prevActiveRef.current = active;
    return () => {
      deactivate();
      prevActiveRef.current = null;
    };
  }, [active, parent]);

  return (
    <BaseElement
      elementName="div"
      _refer_={_ref_}
      _className_={'uc-hideOtherAria'}
      {...other}
    >
      {children}
    </BaseElement>
  );
};

export default HideOtherAria;
