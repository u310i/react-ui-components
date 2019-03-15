import { getComponentMaterials, isArray, isReactComponent } from 'scripts';

const $materials = getComponentMaterials('list');
const $selectors = $materials.selectors;

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
        style[$selectors.nthChild(i + 1)] = {
          [$selectors.divFirstChild]: {
            paddingLeft: paddingLeftValue,
            ...levelStyle[level - 1]
          },
          [$selectors.ulSecondChild]: {
            ...innerStyle
          }
        };
      }
    } else {
      style[$selectors.nthChild(i + 1)] = {
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
