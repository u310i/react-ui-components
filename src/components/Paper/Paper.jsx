import React, { useMemo } from 'react';
import $ from './_constants';
import {} from 'scripts';
import { DivElement } from '..';

const $names = $.names;

const Paper = ({
  children,
  style: propStyle,
  elevation = 2,
  shape = 'default',
  ...props
}) => {
  const style = useMemo(() => {
    return {
      padding: '16px 24px',
      borderRadius: $.shape[shape],
      boxShadow: $.shadow[elevation],
      backgroundColor: $.color,
      ...propStyle
    };
  }, [propStyle, shape, elevation]);

  return (
    <DivElement style={style} className={$names.ucPaper} {...props}>
      {children}
    </DivElement>
  );
};

export default Paper;
