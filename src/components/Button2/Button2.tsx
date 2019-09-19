import React from 'react';
import $ from './_constants';
import {} from 'scripts';
import { BaseElement } from '..';

type Props = $Type.ReactUtils.CreateProps<
  {
    disable?: boolean;
    ariaDisabled?: boolean;
  },
  typeof BaseElement
>;

const Button2: React.FC<Props> = ({
  children,
  disabled,
  ariaDisabled,
  ...other
}) => {
  const style = React.useMemo(() => {
    return {};
  }, []);
  return (
    <BaseElement
      elementName="button"
      _style_={style}
      _className_={$.classNames.button2}
      disabled={disabled}
      {...other}
    >
      {children}
    </BaseElement>
  );
};

export default Button2;
