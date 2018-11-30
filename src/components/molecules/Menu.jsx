import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';
import List from 'atoms/List';

export default ({ theme, containerProps: { container, list, general } }) => {
  const componentStyle = {
    main: {
      style: {},
      list: {
        style: {
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          backgroundColor: '#b0c4de',
          '& > li': {
            backgroundColor: '#fafad2',
            '& > a': {
              display: 'block',
              lineHeight: '1',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              fontSize: '1rem',
              '&:link': {},
              '&:visited': {},
              '&:hover': {
                backgroundColor: '#ffe4b5',
                color: 'black'
              }
            }
          }
        }
      }
    }
  };

  return (
    <div className={cx(css(componentStyle))} id="ui-menu">
      <div className={cx(css(componentStyle.main.style))} id="ui-menu-main">
        <ul
          className={cx(css(componentStyle.main.list.style))}
          id="ui-menu-main-list"
        >
          <List
            theme={theme}
            containerProps={{ ...list, general }}
            tagName="li"
          />
        </ul>
      </div>
    </div>
  );
};
