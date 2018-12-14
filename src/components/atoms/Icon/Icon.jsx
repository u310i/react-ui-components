import React from 'react';
import { css, cx } from 'react-emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({
  type = 'fa',
  icon = ['fas', 'coffee'],
  style = {},
  faAttributes = {}
}) => {
  let Component;
  if (type === 'fa') {
    Component = (
      <FontAwesomeIcon
        icon={icon}
        className={cx(css(style), 'icon')}
        {...faAttributes}
      />
    );
  } else {
    Component = <svg />;
  }
  return Component;
};
