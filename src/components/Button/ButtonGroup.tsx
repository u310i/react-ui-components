import * as React from 'react';
import { getComponentConstants, isString } from 'scripts';
import { DivElement } from '..';

const $ = getComponentConstants('button');
const $gStyles = $.group.styles;
const $gSelectors = $.group.selectors;

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
  nestedStyle[$gSelectors.firstChild] = {
    ...$gStyles.firstChild,
    ...firstChildStyle
  };
  nestedStyle[$gSelectors.lastChild] = {
    ...$gStyles.lastChild,
    ...lastChildStyle
  };

  const betweenStyle = between
    ? {
        marginLeft: isString(between) ? between : $gStyles.between.defaultSpace
      }
    : { ...$gStyles.between.noneSpace };

  nestedStyle[$gSelectors.notFirstChild] = {
    ...$gStyles.notFirstChild,
    ...betweenStyle,
    ...notFirstChildStyle
  };
  nestedStyle[$gSelectors.notLastChild] = {
    ...$gStyles.notLastChild,
    ...notLastChildStyle
  };
  if (nthChildStyleList) {
    for (let [n, style] of nthChildStyleList) {
      nestedStyle[$gSelectors.nthChild(n)] = style;
    }
  }
  if (notNthChildStyleList) {
    for (let [n, style] of notNthChildStyleList) {
      nestedStyle[$gSelectors.notNthChild(n)] = style;
    }
  }
  return (
    <DivElement
      style={{ ...propStyle, ...nestedStyle }}
      classNames={[$.group.names.ucButtonGroup]}
    >
      {children}
    </DivElement>
  );
};

export default Group;
