import * as React from "react";
import $ from "./_constants";
import { BaseElement } from "..";

type ComponentProps = $Type.Components.BaseElement._GeneralProps;

type Props = ComponentProps;

declare global {
  namespace $Type {
    namespace Components {
      namespace OnlyScreenReader {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const OnlyScreenReader: React.FC<Props> = props => {
  return (
    <BaseElement
      elementName="a"
      {...props}
      _className_={$.classNames.name}
      _style_={$.styles.style}
    />
  );
};

export default OnlyScreenReader;
