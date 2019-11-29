import * as React from "react";
import { extractElement } from "scripts";
import BaseElement from "../BaseElement/BaseElement";

type ComponentProps = {
  parent?: $Type.ReactUtils.IncludeNode<Element>;
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
  parent = document.body,
  active = true,
  ...other
}) => {
  const nodeRef = React.useRef<null | Element>(null);
  const hiddenNodesRef = React.useRef<Element[]>([]);
  const prevActiveRef = React.useRef<null | boolean>(null);

  const activate = React.useCallback(
    parent => {
      if (nodeRef.current === parent || parent.children.length === 0) return;

      Array.from(parent.children, (childNode: Element) => {
        if (childNode.contains(nodeRef.current)) {
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
    [active]
  );

  const deactivate = React.useCallback(() => {
    hiddenNodesRef.current.forEach(node => {
      node.removeAttribute("aria-hidden");
    });
    hiddenNodesRef.current = [];
  }, []);

  React.useEffect(() => {
    if (!prevActiveRef.current && active) {
      const parentElement = extractElement(parent);
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
      {...other}
      _refer_={nodeRef}
      _className_={"uc-hideOtherAria"}
    >
      {children}
    </BaseElement>
  );
};

export default HideOtherAria;
