import React from 'react';
import { isObject, isArray, isString } from 'scripts';

const Order = ({ children, list = [] }) => {
  const contents = list.map((item, index) => {
    if (isObject(item)) {
      const props = item;
      if (!props.key) props.key = index;
      return children({ props });
    }

    if (isArray(item)) {
      let props = {};
      let child;
      if (isObject(item[0])) props = item[0];
      if (!props.key) props.key = index;
      child = item[1] || '';
      return children({ props, child });
    }
  });

  return <>{contents}</>;
};

export default Order;
