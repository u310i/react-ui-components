import React from 'react';
import { css, cx } from 'react-emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ containerProps: { name, styles } }) => {
  return (
    <FontAwesomeIcon icon={name} className={css(styles)} />
    // <i
    //   className={cx(
    //     className,
    //     css(
    //       {
    //         display: 'block',
    //         lineHeight: '0',
    //         color: 'white'
    //       },
    //       styles
    //     )
    //   )}
    // />
  );
};
