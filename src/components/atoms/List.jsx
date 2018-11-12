import React from 'react';
import Link from 'atoms/Link';

export default ({ theme, containerProps: { container, general } }) => {
  let textNode, attributes, styles;
  const items = container.listItems.map((item, index) => {
    ({ textNode, attributes, styles } = item);
    return (
      <li key={index}>
        <Link
          containerProps={{
            textNode: textNode,
            attributes: { ...attributes },
            styles: {
              ...general.styles,
              ...container.styles,
              ...styles
            }
          }}
        />
      </li>
    );
  });
  return <>{items}</>;
};
