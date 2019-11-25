import * as React from "react";
import $ from "./_constants";
import {} from "scripts";
import { BaseElement } from "..";

type ComponentProps = {
  /**
   * test disabled description
   * test test test
   * @default false
   */
  disabled?: boolean;
  ariaDisabled?: boolean;
  disabledStyle?: React.CSSProperties;
  ariaDisabledStyle?: React.CSSProperties;
  test?: (value: number) => void;
};

type Props = $Type.MergeObject<
  ComponentProps,
  $Type.Components.BaseElement._GeneralProps
>;

declare global {
  namespace $Type {
    namespace Components {
      namespace Button {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

export const Button: React.FC<Props> = ({
  children,
  disabled = false,
  ariaDisabled,
  disabledStyle: propDisabledStyle = $.styles.disabled.style,
  ariaDisabledStyle: propAriaDisabledStyle = $.styles.disabled.style,
  ...other
}) => {
  const style = React.useMemo(() => {
    const disabledStyle = disabled ? propDisabledStyle : {};
    const ariaDisabledStyle = ariaDisabled ? propAriaDisabledStyle : {};
    return { ...$.styles.style, ...ariaDisabledStyle, ...disabledStyle };
  }, [disabled]);
  return (
    <BaseElement
      elementName="button"
      disabled={disabled}
      aria-disabled={ariaDisabled}
      {...other}
      _style_={style}
      _className_={$.classNames.name}
    >
      {children}
    </BaseElement>
  );
};

// Button.displayName = "Button";

// interface Props {
//   disabled?: boolean;
//   ariaDisabled?: boolean;
//   disabledStyle?: object;
//   ariaDisabledStyle?: object;
// }
// export class Button extends React.Component<Props> {
//   render() {
//     const {
//       ariaDisabled,
//       disabledStyle,
//       ariaDisabledStyle,
//       ...other
//     } = this.props;
//     return <button {...other} />;
//   }
// }

export default Button;
