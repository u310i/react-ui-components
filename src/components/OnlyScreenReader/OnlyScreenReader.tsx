import React from 'react';
import $ from './_constants';
import { BaseElement } from '..';

type Props = $Type.ReactUtils.CreateProps<{}, typeof BaseElement>;

const OnlyScreenReader: React.FC<Props> = props => {
  return (
    <BaseElement
      elementName="a"
      _className_={$.classNames.onlyScreenReader}
      _style_={$.styles.style}
      {...props}
    />
  );
};

export default OnlyScreenReader;
