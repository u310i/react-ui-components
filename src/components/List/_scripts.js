import { getComponentMaterials, isArray, isReactComponent } from 'scripts';

const materials = getComponentMaterials('list');
const mSelectors = materials.selectors;
const mOSelectors = materials.origin.selectors;

const addLeftSpace = (children, space = 1, levelStyle = [], level) => {
  if (!level) level = 0;
  level += 1;
  const inner = isArray(children) ? children : [children];
  const style = {};
  const paddingLeftValue = `${space * level}em`;
  inner.forEach((v, i) => {
    if (isReactComponent(v) && v.type.name === 'ListGroup') {
      const innerStyle = addLeftSpace(
        v.props.children,
        space,
        levelStyle,
        level
      );
      if (v.props.title) {
        style[mOSelectors.nested.nthChild(i + 1)] = {
          [mSelectors.divFirstChild]: {
            paddingLeft: paddingLeftValue,
            ...levelStyle[level - 1]
          },
          [mSelectors.ulSecondChild]: {
            ...innerStyle
          }
        };
      }
    } else {
      style[mOSelectors.nested.nthChild(i + 1)] = {
        paddingLeft: paddingLeftValue,
        ...levelStyle[level - 1]
      };
    }
  });
  return style;
};

export default {
  addLeftSpace: addLeftSpace
};
