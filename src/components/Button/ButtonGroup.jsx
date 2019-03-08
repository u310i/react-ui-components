import React from 'react';
import { getComponentMaterials, isString } from 'scripts';
import { DivElement } from 'elements';

const materials = getComponentMaterials('button');
const mStyles = materials.group.styles;
const mSelectors = materials.origin.selectors;

const Group = ({
  children,
  style: propStyle,
  nthChildStyleList = [],
  firstChildStyle = {},
  lastChildStyle = {},
  notNthChildStyleList = [],
  notFirstChildStyle = {},
  notLastChildStyle = {},
  between
}) => {
  const nestedStyle = {};
  nestedStyle[mSelectors.nested.firstChild] = {
    ...mStyles.firstChild,
    ...firstChildStyle
  };
  nestedStyle[mSelectors.nested.lastChild] = {
    ...mStyles.lastChild,
    ...lastChildStyle
  };

  const betweenStyle = between
    ? { marginLeft: isString(between) ? between : mStyles.between.defaultSpace }
    : { ...mStyles.between.noneSpace };

  nestedStyle[mSelectors.nested.notFirstChild] = {
    ...mStyles.notFirstChild,
    ...betweenStyle,
    ...notFirstChildStyle
  };
  nestedStyle[mSelectors.nested.notLastChild] = {
    ...mStyles.notLastChild,
    ...notLastChildStyle
  };
  if (nthChildStyleList) {
    for (let [n, style] of nthChildStyleList) {
      nestedStyle[mSelectors.nested.nthChild(n)] = style;
    }
  }
  if (notNthChildStyleList) {
    for (let [n, style] of notNthChildStyleList) {
      nestedStyle[mSelectors.nested.notNthChild(n)] = style;
    }
  }
  return (
    <DivElement
      style={{ ...propStyle, ...nestedStyle }}
      classNames={[materials.group.names.ucButtonGroup]}
    >
      {children}
    </DivElement>
  );
};

export default Group;
