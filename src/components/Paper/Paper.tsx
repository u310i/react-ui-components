import React from 'react';
import $ from './_constants';
import {} from 'scripts';
import { BaseElement } from '..';

const $names = $.names;
const $styles = $.styles;

type Props = $Type.CreateProps<
  {
    elevation?: number;
    shape?: $Type.Constants.Origin.Shape;
  },
  typeof BaseElement
>;

const Paper: React.FC<Props> = ({
  children,
  elevation = 2,
  shape = 'default',
  ...other
}) => {
  const _style_ = React.useMemo(() => {
    return {
      ...$styles.style,
      borderRadius: $.shape[shape],
      boxShadow: $.shadow[elevation],
      backgroundColor: $.color,
    };
  }, [shape, elevation]);

  return (
    <BaseElement
      elementName="div"
      _style_={_style_}
      _className_={$names.ucPaper}
      {...other}
    >
      {children}
    </BaseElement>
  );
};

export default Paper;
