import * as React from 'react';
import { jsx } from '@emotion/core';
import { common as commonStyle } from './style';
import htmlStyleMap from './htmlStyleMap';
import inputHtmlStyleMap from './inputHtmlStyleMap';
import { injectElementToRef } from 'scripts';

type ComponentProps = {
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
  _refer_?: $Type.Ref;
  refer?: $Type.Ref;
  elementName?: keyof JSX.IntrinsicElements;
};

type Props<
  T1 = ComponentProps,
  T2 = React.AllHTMLAttributes<Element>,
  T3 = React.SVGAttributes<Element>
> = Readonly<T1 & Omit<T2, keyof T1> & Omit<T3, keyof T1 | keyof T2>>;

declare global {
  namespace $Type {
    namespace Components {
      type BaseElementProps = Partial<Props>;
      type BaseElementDefinedProps = Partial<ComponentProps>;
      type BaseElementSVGProps = Partial<
        ComponentProps &
          Omit<React.SVGAttributes<Element>, keyof ComponentProps>
      >;
    }
  }
}

const BaseElement: React.FC<Props> = ({
  elementName = 'div',
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
  const style = React.useMemo(() => {
    return {
      ...commonStyle,
      ...htmlStyleMap[elementName as keyof typeof htmlStyleMap],
      ...(elementName === 'input' &&
        type &&
        inputHtmlStyleMap[type as keyof typeof inputHtmlStyleMap]),
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
    injectElementToRef(propRefer, element);
    injectElementToRef(_refer_, element);
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
