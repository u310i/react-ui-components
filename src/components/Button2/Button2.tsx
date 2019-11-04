import React from 'react';
import $ from './_constants';
import {} from 'scripts';
import { BaseElement } from '..';

const $styles = $.styles;

type Props = $Type.ReactUtils.CreateProps<
  {
    disabled?: boolean;
    ariaDisabled?: boolean;
    disabledStyle?: React.CSSProperties;
    ariaDisabledStyle?: React.CSSProperties;
  },
  typeof BaseElement
>;

const Button2: React.FC<Props> = ({
  children,
  disabled,
  ariaDisabled,
  disabledStyle: propDisabledStyle = $styles.disabled.style,
  ariaDisabledStyle: propAriaDisabledStyle = $styles.disabled.style,
  ...other
}) => {
  const style = React.useMemo(() => {
    const disabledStyle = disabled ? propDisabledStyle : {};
    const ariaDisabledStyle = ariaDisabled ? propAriaDisabledStyle : {};
    return { ...$styles.style, ...ariaDisabledStyle, ...disabledStyle };
  }, []);

  return (
    <BaseElement
      elementName="button"
      _style_={style}
      _className_={$.classNames.button2}
      disabled={disabled}
      aria-disabled={ariaDisabled}
      {...other}
    >
      {children}
    </BaseElement>
  );
};

export default Button2;
