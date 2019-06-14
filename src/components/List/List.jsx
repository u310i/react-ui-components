import React, { useMemo } from 'react';
import $ from './_constants';
import { isString, isReact } from 'scripts';
import { UlElement, LiElement, DivElement, SpanElement } from '..';
import scripts from './_scripts';

const $styles = $.styles;
const $names = $.names;

const List = ({
  children,
  style: propStyle = {},
  width = $styles.list.width,
  space,
  levelStyle,
  ...props
}) => {
  const leftSpaceStyle = scripts.addLeftSpace(children, space, levelStyle);

  const mutableStyle = useMemo(() => {
    return {
      width: width
    };
  }, [width]);

  const style = useMemo(() => {
    return {
      ...mutableStyle,
      ...leftSpaceStyle,
      ...propStyle
    };
  }, [mutableStyle, propStyle]);

  return (
    <UlElement style={style} classNames={[$names.ucList]} {...props}>
      {children}
    </UlElement>
  );
};

// -------------------------------------------------------------

const ListGroup = ({
  children,
  style: propStyle,
  title,
  titleStyle: propTitleStyle,
  ...props
}) => {
  const style = useMemo(() => {
    return propStyle;
  }, [propStyle]);

  const titleComponent = useMemo(() => {
    if (title) {
      if (isString(title)) {
        const titleStyle = $styles.group.title;
        return (
          <DivElement style={{ ...titleStyle, ...propTitleStyle }}>
            <SpanElement>{title}</SpanElement>
          </DivElement>
        );
      } else if (isReact(title)) {
        return title;
      }
    }
  }, [title]);

  return (
    <LiElement style={style} classNames={[$names.ucListGroup]} {...props}>
      {titleComponent}
      <UlElement>{children}</UlElement>
    </LiElement>
  );
};

// -------------------------------------------------------------

const ListItem = ({ children, style: propStyle, ...props }) => {
  const mainStyle = $styles.item.main;

  const style = useMemo(() => {
    return { ...mainStyle, ...propStyle };
  }, [propStyle]);

  return (
    <LiElement style={style} {...props}>
      <DivElement>{children}</DivElement>
    </LiElement>
  );
};

List.Group = ListGroup;
List.Item = ListItem;

export default List;
