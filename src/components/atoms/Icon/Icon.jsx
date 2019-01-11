import React from 'react';
import { css, cx } from 'react-emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getIcon } from 'src/icons/ownIcons';

const Icon = ({
  type = 'own',
  icon,
  style: propStyle = {},
  symbol = false,
  use = false,
  ...props
}) => {
  const componentStyle = {
    display: 'inline-block',
    height: '1em',
    fontSize: 'inherit',
    verticalAlign: '-.125em'
  };

  const iconIsArray = Array.isArray(icon);
  const name = iconIsArray ? icon.join('-') : icon;

  if (type === 'own' && !iconIsArray && !use) {
    const Component = getIcon(name);
    return (
      <Component
        className={cx(
          `uc-svg-i-${type}`,
          css({ ...componentStyle, ...propStyle })
        )}
        id={symbol ? `uc-svg-i-${type}-symbol-${name}` : ''}
        symbol={symbol}
        {...props}
      />
    );
  } else if (type === 'fa' && !use) {
    return (
      <FontAwesomeIcon
        icon={icon}
        className={cx(`uc-svg-i-${type}`, css(propStyle))}
        symbol={symbol ? `uc-svg-i-${type}-symbol-${name}` : false}
        {...props}
      />
    );
  } else if (use) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={cx(
          `uc-svg-i-${type}-use`,
          css({ ...componentStyle, width: '1.25em', ...propStyle })
        )}
        {...props}
      >
        <use xlinkHref={`#uc-svg-i-${type}-symbol-${name}`} />
      </svg>
    );
  }
};

export default Icon;
