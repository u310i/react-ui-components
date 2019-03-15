import React, { useMemo } from 'react';
import $materials from './_materials';
import { isString, isReact } from 'scripts';
import { UlElement, LiElement, DivElement, SpanElement } from 'elements';
import scripts from './_scripts';

const $styles = $materials.styles;
const $names = $materials.names;

const List = ({
  children,
  style: propStyle = {},
  width = $styles.list.width,
  space,
  levelStyle,
  ...props
}) => {
  const leftSpaceStyle = scripts.addLeftSpace(children, space, levelStyle);

  const fluidStyle = useMemo(() => {
    return {
      width: width
    };
  }, [width]);

  const style = useMemo(() => {
    return {
      ...fluidStyle,
      ...leftSpaceStyle,
      ...propStyle
    };
  }, [fluidStyle, propStyle]);

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
  const solidStyle = $styles.item.solid;

  const style = useMemo(() => {
    return { ...solidStyle, ...propStyle };
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
