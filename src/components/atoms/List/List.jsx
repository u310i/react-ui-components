import React from 'react';
import { css, cx } from 'emotion';
import Link from 'atoms/Link';
import ListItem from 'atoms/ListItem';

const List = ({
  render,
  theme,
  propList = [],
  componentList = [],
  mode = 'render',
  ids = []
}) => {
  const pLength = propList.length,
    cLength = componentList.length,
    idsLength = ids.length,
    possible = pLength > 0 || cLength > 0,
    isRender = mode === 'render',
    isComponent = mode === 'component',
    hocExists = isComponent && possible && pLength === cLength,
    idsExists = idsLength === pLength || idsLength === cLength;

  let child, list, elList;
  if (isRender && possible) {
    list = propList;
    elList = list.map((item, index) => {
      child = render(item);
      return (
        <ListItem key={(idsExists && ids[index]) || index}>{child}</ListItem>
      );
    });
  } else if (isComponent && possible) {
    list = componentList;
    elList = list.map((item, index) => {
      child =
        (hocExists && typeof item === 'function' && item(propList[index])) ||
        item;
      return (
        <ListItem key={(idsExists && ids[index]) || index}>{child}</ListItem>
      );
    });
  }
  return <>{elList}</>;
};

export default List;
// export default React.memo(List);
