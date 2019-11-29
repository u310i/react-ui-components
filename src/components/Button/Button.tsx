import * as React from "react";
import $ from "./_constants";
import {} from "scripts";
import BaseElement from "../BaseElement/BaseElement";

type ComponentProps = {
  /**
   * prop description
   */
  disabled?: boolean;
  /**
   * prop description
   */
  ariaDisabled?: boolean;
  /**
   * prop description
   * @default $.styles.disabled.style
   */
  disabledStyle?: React.CSSProperties;
  /**
   * prop description
   * @default $.styles.disabled.style
   */
  ariaDisabledStyle?: React.CSSProperties;
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

/**
 * General component description.
 */
const Button: React.FC<Props> = ({
  children,
  disabled,
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
