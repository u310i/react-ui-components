import * as React from 'react';
import { jsx } from '@emotion/core';
import { common as commonStyle } from './style';
import elementStyleMap from './elementStyleMap';
import inputElementStyleMap from './inputElementStyleMap';
import { getElementRef } from 'scripts';
import * as CSS from 'csstype';

type Arias = {
  [key: string]: string | boolean | number;
};

type Refer =
  | {
      current: null | any;
    }
  | ((element: any) => void);

type ToUnion<T, K extends keyof T> = K extends keyof T ? T[K] : never;

type InsertPropsWithKeysForToUnion<T> = ToUnion<T, keyof T>;

type ReMakeElementTagNameMap<T, U> = {
  [P in keyof U]: Omit<U[P], keyof T> & { tagName: P };
};

type MergeProps<T, U> = InsertPropsWithKeysForToUnion<
  ReMakeElementTagNameMap<T, U>
> &
  Omit<T, 'tagName'>;

type Props = {
  tagName: keyof ElementTagNameMap;
  type?: string;
  _style_?: CSS.Properties;
  style?: CSS.Properties;
  _className_?: string;
  classNames?: string[];
  className?: string;
  _id_?: string;
  ids?: string[];
  id?: string;
  _arias_?: Arias;
  arias?: Arias;
  _refer_?: Refer;
  refer?: Refer;
};

type BaseProps = Readonly<MergeProps<Props, ElementTagNameMap>>;

const BaseElement: React.FC<BaseProps> = ({
  tagName,
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
      ...(elementStyleMap as any)[tagName],
      ...(tagName === 'input' && type && (inputElementStyleMap as any)[type]),
      ..._style_,
      ...propStyle,
    };
  }, [_style_, propStyle, tagName, type]);

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
    const baseArias = {
      ..._arias_,
      ...propArias,
    } as any;
    const arias = {} as any;
    for (let key of Object.keys(baseArias)) {
      arias[`aria-${key}`] = baseArias[key];
    }
    return arias;
  }, [_arias_, propArias]);

  const refer = React.useCallback(element => {
    getElementRef<string>(propRefer, element);
    getElementRef(_refer_, element);
  }, []);

  return jsx(
    tagName,
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
