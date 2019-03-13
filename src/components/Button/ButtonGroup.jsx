import React from 'react';
import { getComponentMaterials, isString } from 'scripts';
import { DivElement } from 'elements';

const materials = getComponentMaterials('button');
const mStyles = materials.group.styles;
const mGSelectors = materials.group.selectors;

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
  nestedStyle[mGSelectors.firstChild] = {
    ...mStyles.firstChild,
    ...firstChildStyle
  };
  nestedStyle[mGSelectors.lastChild] = {
    ...mStyles.lastChild,
    ...lastChildStyle
  };

  const betweenStyle = between
    ? { marginLeft: isString(between) ? between : mStyles.between.defaultSpace }
    : { ...mStyles.between.noneSpace };

  nestedStyle[mGSelectors.notFirstChild] = {
    ...mStyles.notFirstChild,
    ...betweenStyle,
    ...notFirstChildStyle
  };
  nestedStyle[mGSelectors.notLastChild] = {
    ...mStyles.notLastChild,
    ...notLastChildStyle
  };
  if (nthChildStyleList) {
    for (let [n, style] of nthChildStyleList) {
      nestedStyle[mGSelectors.nthChild(n)] = style;
    }
  }
  if (notNthChildStyleList) {
    for (let [n, style] of notNthChildStyleList) {
      nestedStyle[mGSelectors.notNthChild(n)] = style;
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
