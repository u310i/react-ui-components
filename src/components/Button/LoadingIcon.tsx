import * as React from 'react';
import { Icon, BaseElement } from '..';
import { getComponentConstants } from 'scripts';

const $ = getComponentConstants('button');
const $names = $.contents.names;

const LoadingIcon = ({ style: propStyle = {} }) => {
  return (
    <BaseElement
      elementName="i"
      key={$names.buttonLoading}
      style={propStyle}
      className={$names.buttonLoading}
    >
      <Icon icon={['sys', 'loading']} spin />
    </BaseElement>
  );
};

export default LoadingIcon;
