import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';
import List from 'atoms/List';
import Link from 'atoms/Link';

const Menu = ({ theme, itemList }) => {
  const componentStyle = {
    style: {},
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
    <div className={cx(css(componentStyle.style))} id="uc-menu">
      <ul className={cx(css(componentStyle.main.list.style))} id="uc-menu-list">
        <List theme={theme} itemList={itemList}>
          {({ text, attribute, style }) => {
            return (
              <li>
                <Link text={text} attribute={attribute} style={style} />
              </li>
            );
          }}
        </List>
      </ul>
    </div>
  );
};

export default Menu;
