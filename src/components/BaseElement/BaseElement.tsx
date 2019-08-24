import * as React from 'react';
import { jsx } from '@emotion/core';
import { common as commonStyle } from './style';
import htmlStyleMap from './htmlStyleMap';
import inputHtmlStyleMap from './inputHtmlStyleMap';
import { getElementRef } from 'scripts';
import * as CSS from 'csstype';

type Props = Readonly<{
  type?: string;
  _style_?: React.CSSProperties;
  style?: React.CSSProperties;
  _className_?: string;
  classNames?: string[];
  className?: string;
  _id_?: string;
  ids?: string[];
  id?: string;
  _arias_?: React.AriaAttributes;
  arias?: React.AriaAttributes;
  _refer_?: $Type.Refer;
  refer?: $Type.Refer;
  elementName: keyof JSX.IntrinsicElements;
}>;

declare global {
  namespace $Type {
    type BaseElementProps = Partial<Props>;
  }
}

const BaseElement: React.FC<Props> = ({
  elementName,
  type,
  children,
  _style_,
  style: propStyle,
  _className_,
  classNames: propClassNames,
  className: propClassName,
  _id_,
  ids: propIds,
  id: propId,
  _arias_,
  arias: propArias,
  _refer_,
  refer: propRefer,
  ...other
}) => {
  const style: CSS.Properties = React.useMemo(() => {
    return {
      ...commonStyle,
      ...htmlStyleMap[elementName],
      ...(elementName === 'input' && type && inputHtmlStyleMap[type]),
      ..._style_,
      ...propStyle,
    } as const;
  }, [_style_, propStyle, elementName, type]);

  const className = React.useMemo(() => {
    return (
      [
        ...(propClassName ? [propClassName] : []),
        ...(propClassNames || []),
        ...(_className_ ? [_className_] : []),
      ].join(' ') || null
    );
  }, [_className_, propClassNames, propClassName]);

  const id = React.useMemo(() => {
    return (
      [
        ...(propId ? [propId] : []),
        ...(propIds || []),
        ...(_id_ ? [_id_] : []),
      ].join(' ') || null
    );
  }, [_id_, propIds, propId]);

  const arias = React.useMemo(() => {
    return {
      ..._arias_,
      ...propArias,
    } as React.AriaAttributes;
  }, [_arias_, propArias]);

  const refer = React.useCallback((element: Element) => {
    getElementRef(propRefer, element);
    getElementRef(_refer_, element);
  }, []);

  return jsx(
    elementName,
    {
      type: type,
      css: style,
      className: className,
      id: id,
      ref: refer,
      ...arias,
      ...other,
    },
    children
  );
};

export default BaseElement;
