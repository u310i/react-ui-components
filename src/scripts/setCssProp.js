export const setTransition = (node, value) => {
  node.style.webkitTransition = value;
  node.style.transition = value;
};

export const setTransform = (node, value) => {
  node.style.webkitTransform = value;
  node.style.transform = value;
};
