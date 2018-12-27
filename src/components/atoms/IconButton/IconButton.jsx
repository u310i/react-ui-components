import React from 'react';
import { css, cx } from 'react-emotion';

import Icon from 'atoms/Icon';

export default ({ theme, parentProps = {}, icon, options = {}, onClick }) => {
  const { style: parentStyle = {} } = parentProps;
  const { style: propStyle = {} } = options;

  const componentStyle = {
    fontSize: '1.5rem',
    backgroundColor: '#ff7f50',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem'
  };

  return (
    <button
      onClick={onClick}
      className={cx(
        css({ ...componentStyle, ...parentStyle, ...propStyle }),
        'uc-iconbutton'
      )}
    >
      <Icon theme={theme} icon={icon} />
    </button>
  );
};
