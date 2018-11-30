import React from 'react';
import { css, cx } from 'react-emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ containerProps: { name, style } }) => {
  return (
    <FontAwesomeIcon icon={name} className={css(style)} />
    // <i
    //   className={cx(
    //     className,
    //     css(
    //       {
    //         display: 'block',
    //         lineHeight: '0',
    //         color: 'white'
    //       },
    //       style
    //     )
    //   )}
    // />
  );
};
