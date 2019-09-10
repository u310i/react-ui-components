import * as React from 'react';
import { getComponentConstants } from 'scripts';
import { BaseElement } from '..';
import * as CSS from 'csstype';
const $ = getComponentConstants('button');
const $gStyles = $.group.styles;
const $gSelectors = $.group.selectors;

type Props = $Type.ReactUtils.CreateProps<
  {
    nthChildStyleList?: [number, React.CSSProperties][];
    firstChildStyle?: React.CSSProperties;
    lastChildStyle?: React.CSSProperties;
    notNthChildStyleList?: [number, React.CSSProperties][];
    notFirstChildStyle?: React.CSSProperties;
    notLastChildStyle?: React.CSSProperties;
    between?: $Type.Components.ButtonBetween;
  },
  typeof BaseElement
>;

const ButtonGroup: React.FC<Props> = ({
  children,
  nthChildStyleList = [],
  firstChildStyle = {},
  lastChildStyle = {},
  notNthChildStyleList = [],
  notFirstChildStyle = {},
  notLastChildStyle = {},
  between,
}) => {
  const nestedStyle: { [pseudos: string]: React.CSSProperties } = {};
  nestedStyle[$gSelectors.firstChild] = {
    ...$gStyles.firstChild,
    ...firstChildStyle,
  };
  nestedStyle[$gSelectors.lastChild] = {
    ...$gStyles.lastChild,
    ...lastChildStyle,
  };

  const betweenStyle = between
    ? {
        marginLeft:
          typeof between === 'string' ? between : $gStyles.between.defaultSpace,
      }
    : { ...$gStyles.between.noneSpace };

  nestedStyle[$gSelectors.notFirstChild] = {
    ...$gStyles.notFirstChild,
    ...betweenStyle,
    ...notFirstChildStyle,
  };
  nestedStyle[$gSelectors.notLastChild] = {
    ...$gStyles.notLastChild,
    ...notLastChildStyle,
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
    <BaseElement
      elementName="div"
      _style_={nestedStyle}
      _className_={$.group.names.buttonGroup}
    >
      {children}
    </BaseElement>
  );
};

export default ButtonGroup;
