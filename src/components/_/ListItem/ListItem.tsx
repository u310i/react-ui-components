import * as React from 'react';

const ListItem = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

const ListItemWithMemo = React.memo(ListItem);

export default ListItem;
