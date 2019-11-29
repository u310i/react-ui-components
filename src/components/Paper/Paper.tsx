import * as React from "react";
import $ from "./_constants";
import {} from "scripts";
import BaseElement from "../BaseElement/BaseElement";

type ComponentProps = {
  elevation?: number;
  shape?: $Type.Constants.Origin.Shape;
};

type Props = $Type.MergeObject<
  ComponentProps,
  $Type.Components.BaseElement._GeneralProps
>;

declare global {
  namespace $Type {
    namespace Components {
      namespace Paper {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const Paper: React.FC<Props> = ({
  children,
  elevation = 2,
  shape = "default",
  ...other
}) => {
  const _style_ = React.useMemo(() => {
    return {
      ...$.styles.style,
      borderRadius: $.shape[shape],
      boxShadow: $.shadow[elevation],
      backgroundColor: $.color
    };
  }, [shape, elevation]);

  return (
    <BaseElement
      elementName="div"
      {...other}
      _style_={_style_}
      _className_={$.classNames.name}
    >
      {children}
    </BaseElement>
  );
};

export default Paper;
