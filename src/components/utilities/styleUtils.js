export const genReactCSSTransitionStyle = (name, fn) => {
  const {
    defaultStyle,
    appear,
    appearActive,
    enter,
    enterActive,
    enterDone,
    exit,
    exitActive,
    exitDone
  } = fn();

  return {
    ...(defaultStyle || {}),
    [`&.${name}-appear`]: appear || enter,
    [`&.${name}-appear-active`]: appearActive || enterActive,
    [`&.${name}-enter`]: enter,
    [`&.${name}-enter-active`]: enterActive,
    [`&.${name}-enter-done`]: enterDone || exit,
    [`&.${name}-exit`]: exit,
    [`&.${name}-exit-active`]: exitActive,
    [`&.${name}-exit-done`]: exitDone || enter
  };
};

export const createTransitionalProperty = style => {
  return Object.keys(style)
    .map(value => {
      return fromCamelCase(value, '-');
    })
    .join();
};
