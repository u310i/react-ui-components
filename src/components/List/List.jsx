import React, { useMemo } from 'react';
import './_materials';
import { UlElement, LiElement, DivElement, SpanElement } from 'elements';
import { getComponentMaterials, isString, isReact } from 'scripts';
import scripts from './_scripts';

const materials = getComponentMaterials('list');
const mStyles = materials.styles;
const mNames = materials.names;

const List = ({
  children,
  style: propStyle = {},
  width = mStyles.list.width,
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
    <UlElement style={style} classNames={[mNames.ucList]} {...props}>
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
        const titleStyle = mStyles.group.title;
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
    <LiElement style={style} classNames={[mNames.ucListGroup]} {...props}>
      {titleComponent}
      <UlElement>{children}</UlElement>
    </LiElement>
  );
};

// -------------------------------------------------------------

const ListItem = ({ children, style: propStyle, ...props }) => {
  const solidStyle = mStyles.item.solid;

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
