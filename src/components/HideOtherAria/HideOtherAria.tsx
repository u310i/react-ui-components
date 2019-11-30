import * as React from "react";
import { extractElement } from "scripts";
import BaseElement from "../BaseElement/BaseElement";

type ComponentProps = {
  parent?: $Type.ReactUtils.IncludeNode<Element>;
  target?: $Type.ReactUtils.IncludeNode<Element>;
  active?: boolean;
};

type Props = $Type.MergeObject<
  ComponentProps,
  $Type.Components.BaseElement._GeneralProps
>;

declare global {
  namespace $Type {
    namespace Components {
      namespace HideOtherAria {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const HideOtherAria: React.FC<Props> = ({
  children,
  parent: propParent = document.body,
  target: propTarget,
  active = true
}) => {
  const hiddenNodesRef = React.useRef<Element[]>([]);
  const activatedRef = React.useRef<boolean>(false);

  const activate = React.useCallback(
    parent => {
      const target = extractElement(propTarget);
      if (
        target === parent ||
        !target ||
        !parent ||
        parent.children.length === 0
      )
        return;

      Array.from(parent.children, (childNode: Element) => {
        if (childNode.contains(target)) {
          activate(childNode);
        } else {
          const attr = childNode.getAttribute("aria-hidden");
          const alreadyHidden = attr !== null && attr !== "false";

          if (!alreadyHidden) {
            hiddenNodesRef.current.push(childNode);
            childNode.setAttribute("aria-hidden", "true");
          }
        }
      });
    },
    [parent, propTarget]
  );

  const deactivate = React.useCallback(() => {
    hiddenNodesRef.current.forEach(node => {
      node.removeAttribute("aria-hidden");
    });
    hiddenNodesRef.current = [];
  }, []);

  React.useEffect(() => {
    if (active) {
      activatedRef.current && deactivate();
      const parent = extractElement(propParent);
      activate(parent);
      activatedRef.current = true;
    } else {
      if (activatedRef.current) {
        activatedRef.current && deactivate();
        activatedRef.current = false;
      }
    }
    return () => {
      deactivate();
      activatedRef.current = false;
    };
  }, [active, propParent, propTarget]);

  return <>{children}</>;
};

export default HideOtherAria;
