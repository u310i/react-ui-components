import React from 'react';
import { css, cx } from 'react-emotion';

import Icon from 'atoms/Icon';

export default ({ icon, options = {}, style: propStyle = {}, onClick }) => {
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
      className={cx(css({ ...componentStyle, ...propStyle }), 'uc-iconbutton')}
    >
      <Icon {...icon} />
    </button>
  );
};
