import React from 'react';
import { css, cx } from 'emotion';
import Link from 'atoms/Link';

export default ({ theme, containerProps: { container, general }, tagName }) => {
  let textNode, attribute, style;
  const items = container.listItems.map((item, index) => {
    ({ textNode, attribute, style } = item);
    const link = (
      <Link
        containerProps={{
          textNode: textNode,
          attribute: { ...attribute },
          style: {
            ...general.style,
            ...container.style,
            ...style
          }
        }}
      />
    );
    return React.createElement(tagName, { key: index, id: 'ui-list' }, link);
  });
  return <>{items}</>;
};
