import React from 'react';
import { css, cx } from 'react-emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ icon, style }) => {
  return (
    <FontAwesomeIcon icon={icon} className={css(style)} />
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
