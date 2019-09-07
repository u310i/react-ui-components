// import * as React from 'react';
import * as CSS from 'csstype';
import { keyframes } from '@emotion/core';
import { Component } from 'react';

declare global {
  export namespace $Type {
    namespace Components { }
    namespace Animation {
      type Keyframes = ReturnType<typeof keyframes>
    }
    namespace Utils {
      type FontSize = number | string
    }
    namespace Constants {
      type Shape = 'corner' | 'default' | 'round' | 'circle';
    }
    namespace Transition {
      type CommonProps = {
        duration?: Duration;
        easing?: Easing;
        disableHideVisibility?: boolean;
      }

      type Duration =
        | {
          enter: number;
          exit?: number;
          appear?: number;
        }
        | number;
      type Easing =
        | {
          enter: string;
          exit?: string;
          appear?: string;
        }
        | string;

      type PropTransitionComponentProps<
        T1 = Omit<Components.CSSTransitionProps, 'timeout'>,
        T2 = CommonProps,
        T3 = Components.BaseElementProps
        > = T1 & T2 & Omit<T3, keyof T1 | keyof T2>;
    }

    type AnyIndexSignature = { [key: string]: any }

    type DeepPartial<T> = {
      [P in keyof T]?: T[P] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : DeepPartial<T[P]>;
    };

    type ExtractProps<
      T extends React.JSXElementConstructor<any> | {}
      > = T extends React.JSXElementConstructor<infer P> ? P : {};


    type CreateProps<
      T1 extends AnyIndexSignature = {},
      T2 extends React.JSXElementConstructor<any> | AnyIndexSignature = {},
      T3 extends AnyIndexSignature = {}
      > =
      Readonly<T1> &
      (T2 extends React.JSXElementConstructor<any>
        ? Omit<ExtractProps<T2>, 'children' | Components.BaseElementIgnoreProps | keyof T1 | keyof T3>
        : T2 extends AnyIndexSignature
        ? Omit<T2, 'children' | Components.BaseElementIgnoreProps | keyof T1 | keyof T3>
        : {}) &
      Omit<T3, 'children' | Components.BaseElementIgnoreProps | keyof T1>
      ;

    // type SpecificPartial<T, K extends keyof T> = Partial<Pick<T, K>> &
    //   Omit<T, K>;

    type FunctionComponentWithoutChildren<P = {}> = {
      (props: P, context?: any): React.ReactElement | null;
      propTypes?: React.WeakValidationMap<P>;
      contextTypes?: React.ValidationMap<any>;
      defaultProps?: Partial<P>;
      displayName?: string;
    };

    type PropComponentProps<
      T extends React.JSXElementConstructor<any>
      > = Partial<Omit<ExtractProps<T>, 'children'>>;

    type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> &
      Omit<T, K>;



    type MaybeNode<T = Node> = T | null;

    type Ref<T = Node> =
      | {
        current: T | null;
      }
      | ((element: T | null) => void);

    type IncludeNode<T = Node> =
      | { current: MaybeNode<T> }
      | (() => MaybeNode<T>)
      | string
      | T
      | null;

    // type IntrinsicElementsKeys = JSX.IntrinsicElements[keyof JSX.IntrinsicElements];

    // type FunctionalComponent<P> = (props: P) => React.ReactElement | null;
    // type FunctionalComponentProps<
    //   T extends FunctionalComponent<any>
    // > = T extends FunctionalComponent<infer P> ? P : never;
  }
}
