import * as React from 'react';
import { Icon, BaseElement } from '..';
import { getComponentConstants } from 'scripts';

const $ = getComponentConstants('button');
const $names = $.contents.names;

const LoadingIcon = ({ style: propStyle = {} }) => {
  return (
    <BaseElement
      elementName="i"
      key={$names.loading}
      style={propStyle}
      className={$names.buttonLoading}
    >
      <Icon icon={$names.sysLoading} spin />
    </BaseElement>
  );
};

export default LoadingIcon;
