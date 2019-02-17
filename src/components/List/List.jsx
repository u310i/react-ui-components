import React, { useCallback, useMemo } from 'react';
import { Order } from 'components';
import {
  UlElement,
  LiElement,
  DivElement,
  AElement,
  ButtonElement,
  InputSubmitElement
} from 'components/_Elements';

const List = ({
  children,
  style: propStyle = {},
  width = '256px',
  ...props
}) => {
  const solidStyle = useMemo(() => {
    return {};
  }, []);

  const fluidStyle = useMemo(() => {
    return {
      width: width
    };
  }, [width]);

  const style = useMemo(() => {
    return {
      ...solidStyle,
      ...fluidStyle,
      ...propStyle
    };
  }, [solidStyle, fluidStyle, propStyle]);

  return (
    <UlElement style={style} classNames={['uc-list']} {...props}>
      {children}
    </UlElement>
  );
};

const Group = ({ children, title, ...props }) => {
  const titleComponent = title && <DivElement>{title}</DivElement>;
  return (
    <LiElement classNames={['uc-list-group']} {...props}>
      {titleComponent}
      <UlElement>{children}</UlElement>
    </LiElement>
  );
};

const Item = ({ children, ...props }) => {
  return <LiElement {...props}>{children}</LiElement>;
};

List.Group = Group;
List.Item = Item;

export default List;
