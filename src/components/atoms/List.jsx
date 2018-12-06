import React from 'react';
import { css, cx } from 'emotion';
import Link from 'atoms/Link';

const Item = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

const ItemWithMemo = React.memo(Item);

const List = ({ children, theme, itemList }) => {
  const elementList = itemList.map((item, index) => {
    return <Item key={index}>{children(item)}</Item>;
  });
  return <>{elementList}</>;
};

export default List;
// export default React.memo(List);
