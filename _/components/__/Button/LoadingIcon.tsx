import * as React from 'react';
import { Icon, BaseElement } from '..';
import { getComponentConstants } from 'scripts';

const $ = getComponentConstants('button');
const $.classNames = $.contents.classNames;

const LoadingIcon = ({ style: propStyle = {} }) => {
  return (
    <BaseElement
      elementName="i"
      key={$.classNames.buttonLoading}
      style={propStyle}
      className={$.classNames.buttonLoading}
    >
      <Icon icon={['sys', 'loading']} spin />
    </BaseElement>
  );
};

export default LoadingIcon;
