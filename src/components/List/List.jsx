import React, { useCallback, useMemo } from 'react';
import { Order } from 'components';
import {
  UlElement,
  LiElement,
  DivElement,
  AElement,
  ButtonElement,
  InputSubmitElement,
  SpanElement
} from 'elements';

import { isString, isArray, isObject, isReact } from 'scripts';

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

// -------------------------------------------------------------

const Group = ({
  children,
  style: propStyle,
  title,
  titleStyle: propTitleStyle,
  ...props
}) => {
  // console.log(children.length);
  const solidStyle = useMemo(() => {
    return {};
  }, []);

  const fluidStyle = useMemo(() => {
    return {};
  });

  const style = useMemo(() => {
    return { ...solidStyle, ...fluidStyle, ...propStyle };
  }, [solidStyle, fluidStyle, propStyle]);

  const titleComponent = useMemo(() => {
    if (title) {
      if (isString(title)) {
        const titleStyle = {
          display: 'flex',
          alignItems: 'center',
          height: '3em',
          paddingLeft: '1em'
        };
        return (
          <DivElement style={{ ...titleStyle, ...propTitleStyle }}>
            <SpanElement>{title}</SpanElement>
          </DivElement>
        );
      } else if (isReact) {
        return title;
      }
    }
  }, [title]);

  return (
    <LiElement style={style} classNames={['uc-list-group']} {...props}>
      {titleComponent}
      <UlElement>{children}</UlElement>
    </LiElement>
  );
};

// -------------------------------------------------------------

const Item = ({ children, style: propStyle, ...props }) => {
  const solidStyle = useMemo(() => {
    return {
      display: 'flex',
      alignItems: 'center',
      height: '3em',
      paddingLeft: '1em'
    };
  }, []);

  const fluidStyle = useMemo(() => {
    return {};
  });

  const style = useMemo(() => {
    return { ...solidStyle, ...fluidStyle, ...propStyle };
  }, [solidStyle, fluidStyle, propStyle]);

  return (
    <LiElement style={style} {...props}>
      <DivElement>{children}</DivElement>
    </LiElement>
  );
};

List.Group = Group;
List.Item = Item;

export default List;
