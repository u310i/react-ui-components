import React from 'react';
import { isArray, isString, isObject } from 'scripts';

import { Icon } from 'components';
import Button from './Button';

const getChild = (item, index) => {
  if (isString(item)) {
    return item;
  } else if (isObject(item) && item.icon) {
    return <Icon key={index} {...item} />;
  } else {
    return null;
  }
};

const createButton = (contents, props, group = {}, index = null) => {
  const { childPropList = [], ...groupProps } = group;
  let isGroup = false;
  const children = contents.map((item, i) => {
    if (isArray(item)) {
      isGroup = true;
      return createButton(item, { ...props, ...childPropList[i] }, {}, i);
    }
    return getChild(item, i);
  });

  const key =
    index || index === 0
      ? {
          key: index
        }
      : {};

  return isGroup ? (
    <Button.Group {...key} {...groupProps}>
      {children}
    </Button.Group>
  ) : (
    <Button {...key} {...props}>
      {children}
    </Button>
  );
};

const Coordinator = ({ contents = [], group = {}, ...props }) => {
  return createButton(contents, props, group);
};

export default Coordinator;
