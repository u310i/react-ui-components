import * as React from 'react';
import { jsx } from '@emotion/core';
import { common as commonStyle } from './style';
import htmlStyleMap from './htmlStyleMap';
import inputHtmlStyleMap from './inputHtmlStyleMap';
import { getElementRef } from 'scripts';
import * as CSS from 'csstype';

type Refer =
  | {
      current: null | any;
    }
  | ((element: any) => void);

type DefaultAttributes<U, K extends keyof U, T> = K extends keyof U
  ? Omit<U[K], keyof T> & { elementName: K }
  : never;
type MergeProps<T, U> = Omit<T, 'elementName'> &
  DefaultAttributes<U, keyof U, T>;

type Props = {
  elementName: keyof JSX.IntrinsicElements;
  type?: string;
  _style_?: CSS.Properties;
  style?: CSS.Properties;
  _className_?: string;
  classNames?: string[];
  className?: string;
  _id_?: string;
  ids?: string[];
  id?: string;
  _arias_?: React.AriaAttributes;
  arias?: React.AriaAttributes;
  _refer_?: Refer;
  refer?: Refer;
};

type BaseProps = Readonly<MergeProps<Props, JSX.IntrinsicElements>>;

const BaseElement: React.FC<BaseProps> = ({
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
    };
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

  // type Union<T, K> = K extends keyof T ? T[K] : never;
  // type ToUnion<T> = Union<T, keyof T>;
  const refer = React.useCallback(element => {
    getElementRef<string>(propRefer, element);
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
