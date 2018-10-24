import React from 'react';
import { css } from 'react-emotion';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';

import ActionIcon from 'atoms/ActionIcon';
import List from 'atoms/List';

export default ({
  theme,
  containerProps: {
    general,
    container,
    itemList: { common, list = [] },
    actionIcon
  }
}) => {
  if (!actionIcon.icon.iconName) {
    actionIcon.icon.iconName = faAlignJustify;
  }
  return (
    <nav
      className={css(container.styles)}
      css={{
        backgroundColor: '#333',
        fontSize: '0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        lineHeight: '3',
        padding: '0',
        margin: '0'
      }}
    >
      <List theme={theme} containerProps={{ list, common, general }} />
      {/* <ActionIcon
        theme={theme}
        containerProps={{
          ...actionIcon,
          general
        }} */}
      />
    </nav>
  );
};
