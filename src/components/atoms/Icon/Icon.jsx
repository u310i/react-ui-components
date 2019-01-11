import React from 'react';
import { css, cx } from 'react-emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isObject } from 'utilities/utils';

import SVG from 'atoms/SVG';
import { userDefinedIconList } from 'src/icons';

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
  const iconIsObject = isObject(icon);
  const name =
    (iconIsArray && icon.join('-')) ||
    (iconIsObject && `${icon.prefix}-${icon.iconName}`) ||
    icon;

  if (type === 'own' && !iconIsArray && !use) {
    const iconData = userDefinedIconList.get(name);
    return (
      <SVG
        viewBox={iconData.viewBox}
        inner={iconData.inner}
        symbol={symbol}
        use={use}
        className={cx(
          `uc-svg-i-${type}`,
          css({ ...componentStyle, ...propStyle })
        )}
        id={symbol ? `uc-svg-i-${type}-symbol-${name}` : ''}
        {...props}
      />
    );
  } else if (type === 'fa' && !use) {
    return (
      <FontAwesomeIcon
        icon={icon}
        className={cx(`uc-svg-i-${type}-${name}`, css(propStyle))}
        symbol={symbol ? `uc-svg-i-${type}-symbol-${name}` : false}
        {...props}
      />
    );
  } else if (use) {
    return (
      <SVG
        use={use}
        className={cx(
          `uc-svg-i-${type}-use-${name}`,
          css({ ...componentStyle, width: '1.25em', ...propStyle })
        )}
        xlinkHref={`#uc-svg-i-${type}-symbol-${name}`}
        {...props}
      />
    );
  }
};

export default Icon;
