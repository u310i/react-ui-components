import * as React from 'react';
import $ from './_constants';
import { BaseElement } from '..';

const $.styles = $.styles;
const $.classNames = $.classNames
const $selectors = $.selectors;

const addLeftSpace = (children, space = 1, levelStyle = [], level) => {
  if (!level) level = 0;
  level += 1;
  const inner = Array.isArray(children) ? children : [children];
  const style = {};
  const paddingLeftValue = `${space * level}em`;
  inner.forEach((v, i) => {
    if (
      React.isValidElement(v) &&
      typeof v === 'function' &&
      v.type.name === 'ListGroup'
    ) {
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
            ...levelStyle[level - 1],
          },
          [$selectors.ulSecondChild]: {
            ...innerStyle,
          },
        };
      }
    } else {
      style[$selectors.nthChild(i + 1)] = {
        paddingLeft: paddingLeftValue,
        ...levelStyle[level - 1],
      };
    }
  });
  return style;
};

const List = ({
  children,
  width = $.styles.list.width,
  space,
  levelStyle,
  ...other
}) => {
  const _style_ = React.useMemo(() => {
    return {
      width: width,
      ...addLeftSpace(children, space, levelStyle),
    };
  }, [width, children, space, levelStyle]);

  return (
    <BaseElement _style_={_style_} _className_={$.classNames.list} {...other}>
      {children}
    </BaseElement>
  );
};

// -------------------------------------------------------------

const ListGroup = ({
  children,
  title,
  titleStyle: propTitleStyle,
  ...other
}) => {
  const titleComponent = React.useMemo(() => {
    if (title) {
      if (typeof title === 'string') {
        const titleStyle = $.styles.group.title;
        return (
          <BaseElement style={{ ...titleStyle, ...propTitleStyle }}>
            <BaseElement>{title}</BaseElement>
          </BaseElement>
        );
      } else if (React.isValidElement(title)) {
        return title;
      }
    }
  }, [title]);

  return (
    <BaseElement elementName="li" _className_={$.classNames.listGroup} {...other}>
      {titleComponent}
      <BaseElement elementName="ul">{children}</BaseElement>
    </BaseElement>
  );
};

// -------------------------------------------------------------

const ListItem = ({ children, ...other }) => {
  return (
    <BaseElement elementName="li" _style_={$.styles.item.main} {...other}>
      <BaseElement elementName="div">{children}</BaseElement>
    </BaseElement>
  );
};

List.Group = ListGroup;
List.Item = ListItem;

export default List;
