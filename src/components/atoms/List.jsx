import React from 'react';
import { css, cx } from 'emotion';
import Link from 'atoms/Link';

console.log('list-outer');

const Item = ({ child }) => {
  return <React.Fragment>{child}</React.Fragment>;
};

const ItemWithMemo = React.memo(Item);

const List = ({ render, theme, itemList }) => {
  console.log('list');
  console.log('-------------');
  const elementList = itemList.map((item, index) => {
    return <Item key={index} child={render(item)} item={item} />;
  });
  return <>{elementList}</>;
};

export default List;
