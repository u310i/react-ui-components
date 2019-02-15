import React from 'react';
import { isString, isObject } from 'utilities';

import { Icon } from 'components';
import Button from './Button';

const Coordinator = ({ contents = [], icon = {}, ...props }) => {
  const list = contents.map((item, index) => {
    if (isString(item)) {
      return item;
    } else if (isObject(item) && item.icon) {
      return <Icon key={index} {...item} />;
    } else {
      return;
    }
  });
  return <Button {...props}>{list}</Button>;
};

export default Coordinator;
