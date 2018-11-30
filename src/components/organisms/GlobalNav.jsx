import React, { useState, useEffect } from 'react';
import { css, cx } from 'react-emotion';

import { faBars } from '@fortawesome/free-solid-svg-icons';

import { requestAnimationFrameFallback } from 'utilities/utils';
import ActionIcon from 'atoms/ActionIcon';
import Drawer from 'molecules/Drawer';
import Menu from 'molecules/Menu';

export default ({
  theme,
  containerProps: { general, container, drawer, actionIcon }
}) => {
  const [toggleState, setToggleState] = useState('close');
  const toggle = () => {
    setToggleState(toggleState === 'close' ? 'open' : 'close');
  };

  useEffect(() => {
    const head = document.head;
    const hideOnDownScrollStyle = `
    #ui-globalnav-main.hide-on-scroll-enter {
      transform: translate3d(0,0,0);
      transition: transform 200ms ease-out;
    }
    #ui-globalnav-main.hide-on-scroll-active {
      transform: translate3d(0,-100%,0);
    }
    `;
    const styleNode = document.createElement('style');
    const ruleText = document.createTextNode(hideOnDownScrollStyle);
    styleNode.setAttribute('id', 'hide-menu');
    styleNode.appendChild(ruleText);
    head.appendChild(styleNode);
    return () => {
      const removeNode = document.getElementById('hide-menu');
      if (removeNode) {
        head.removeChild(removeNode);
      }
    };
  }, []);

  useEffect(() => {
    const targetElement = document.getElementById('ui-globalnav-main');
    const targetHeight = targetElement.offsetHeight;
    let lastPosition = window.pageYOffset;
    let offset = lastPosition;
    let hideMenuOnDownScrollToggle = 'visible';
    const hideMenuOnDownScroll = () => {
      lastPosition = window.pageYOffset;
      if (lastPosition > targetHeight) {
        if (lastPosition > offset) {
          if (hideMenuOnDownScrollToggle === 'visible') {
            hideMenuOnDownScrollToggle = 'hide';
            targetElement.classList.add('hide-on-scroll-enter');
            targetElement.classList.add('hide-on-scroll-active');
          }
        } else {
          if (hideMenuOnDownScrollToggle === 'hide') {
            hideMenuOnDownScrollToggle = 'visible';
            targetElement.classList.remove('hide-on-scroll-active');
          }
        }
      } else {
        if (offset > targetHeight) {
          hideMenuOnDownScrollToggle = 'visible';
          targetElement.classList.remove('hide-on-scroll-enter');
          targetElement.classList.remove('hide-on-scroll-active');
        }
      }
      offset = lastPosition;
    };

    let ticking = false;
    const globalNavOnScroll = () => {
      if (!ticking) {
        requestAnimationFrameFallback(() => {
          hideMenuOnDownScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', globalNavOnScroll);

    return () => {
      window.removeEventListener('scroll', globalNavOnScroll);
    };
  });

  if (!actionIcon.container.icon.close) {
    actionIcon.container.icon.name = faBars;
  } else {
    actionIcon.container.icon.name =
      toggleState === 'close'
        ? actionIcon.container.icon.close
        : actionIcon.container.icon.open;
  }

  const componentStyle = {
    style: {},
    main: {
      style: {
        backgroundColor: '#333',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '3rem',
        [theme.breakpoints.presets.sm_to_infinite]: {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          zIndex: '100'
        },
        [theme.breakpoints.presets.sm]: {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          zIndex: '100'
        }
      }
    },
    dummy: {
      style: {
        opacity: '0',
        height: '3rem',
        width: '100%'
      }
    }
  };
  const actionIconComponent = (
    <ActionIcon
      theme={theme}
      containerProps={{
        ...actionIcon,
        general
      }}
      toggle={toggle}
    />
  );

  return (
    <nav className={cx(css(componentStyle.style))} id="ui-globalnav">
      <div
        className={cx(css(componentStyle.main.style), css(container.style))}
        id="ui-globalnav-main"
      >
        <Menu
          theme={theme}
          containerProps={{ ...drawer, general, actionIconComponent }}
          toggle={toggle}
          toggleState={toggleState}
        />
        {actionIconComponent}
      </div>
      <div
        className={cx(css(componentStyle.dummy.style))}
        id="ui-globalnav-dummy"
      />
    </nav>
  );
};
