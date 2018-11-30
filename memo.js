const createBackgroundTransitionStyle = () => {
  const overflowY = 'overflow-y: hidden;';
  const rigthMargin = `margin-right: ${verticalScrollbarWidth}px;`;
  const leftMargin = `margin-right: ${verticalScrollbarWidth}px;`;
  const x =
    direction === 'right'
      ? verticalScrollbarWidth * -1
      : verticalScrollbarWidth;

  return `
  ${theme.breakpoints.presets.min} {
    body.${name}-background-enter {
      transform: translate3d(0px,0,0);
      overflow-x: hidden;
      ${direction === 'right' ? overflowY : ''}
      ${direction === 'right' ? rigthMargin : ''}
    }
    body.${name}-background-enter-active {
      transform: translate3d(${x}px,0,0);
      transition: transform ${duration}ms ${timingFunction};
    }
    body.${name}-background-enter-done {
      transform: translate3d(${x}px,0,0);
      overflow-x: hidden;
      overflow-y: hidden;
      ${direction === 'right' ? rigthMargin : leftMargin}
    }
    body.${name}-background-exit {
      transform: translate3d(${x}px,0,0);
      overflow-x: hidden;
      ${direction === 'right' ? overflowY : ''}
      ${direction === 'right' ? rigthMargin : ''}
    }
    body.${name}-background-exit-active {
      transform: translate3d(0px,0,0);
      transition: transform ${duration}ms ${timingFunction};
    }
  }
  `;
};

const backgroundTransitionStyle = createBackgroundTransitionStyle();

useEffect(() => {
  const styleNode = document.createElement('style');
  const ruleText = document.createTextNode(backgroundTransitionStyle);
  styleNode.setAttribute('id', 'body-drawer');
  styleNode.appendChild(ruleText);
  document.getElementsByTagName('head')[0].appendChild(styleNode);
  return () => {
    const removeNode = document.getElementById('body-drawer');
    if (removeNode) {
      const parentNode = document.getElementsByTagName('head')[0];
      parentNode.removeChild(removeNode);
    }
  };
});

const transitionCallBack = createReactCSSTransitionCallBack(
  `${name}-background`,
  document.getElementsByTagName('body')[0]
);

return (
  <CSSTransition
    in={toggleState === 'open'}
    timeout={duration}
    classNames={name}
    {...transitionCallBack}
  >
    <div
      className={cx(
        css(componentStyle),
        css(drawerTransitionStyle),
        'ui-drawer'
      )}
    >
      <div
        onClick={toggle}
        className={cx(css(componentStyle.overlay.style), 'ui-drawer-overlay')}
      />
      <div className={cx(css(componentStyle.main.style), 'ui-drawer-main')}>
        <div
          className={cx(
            css(componentStyle.main.button.style),
            'ui-drawer-main-button'
          )}
        >
          {actionIconComponent}
        </div>
        <ul
          className={cx(
            css(componentStyle.main.list.style),
            'ui-drawer-main-list'
          )}
        >
          <List
            theme={theme}
            containerProps={{ ...list, general }}
            tagName="li"
          />
        </ul>
      </div>
    </div>
  </CSSTransition>
);
