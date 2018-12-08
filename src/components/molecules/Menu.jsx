import React, { useState, useEffect, useMemo } from 'react';
import { css, cx } from 'emotion';
import List from 'atoms/List';
import Link from 'atoms/Link';

const Menu = ({ theme, list }) => {
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
          '& > .uc-menu-list-item': {
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

  const listItem = useMemo(() => {
    return ({ text, attribute, style }) => (
      <li className={cx('uc-menu-list-item')}>
        <Link text={text} attribute={attribute} style={style} />
      </li>
    );
  }, []);

  return (
    <div className={cx(css(componentStyle.style), 'uc-menu')}>
      <ul className={cx(css(componentStyle.main.list.style), 'uc-menu-list')}>
        <List theme={theme} list={list}>
          {listItem}
        </List>
      </ul>
    </div>
  );
};

export default Menu;
