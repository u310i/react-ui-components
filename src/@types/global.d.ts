// import * as React from 'react';
import * as CSS from 'csstype';
import { keyframes } from '@emotion/core';
import { Component } from 'react';

declare global {
  export namespace $Type {
    namespace ReactUtils {
      type ExtractProps<
        T extends React.JSXElementConstructor<any> | {}
        > = T extends React.JSXElementConstructor<infer P> ? P : {};


      type CreateProps<
        T1 extends object = {},
        T2 extends React.JSXElementConstructor<any> | object = {},
        T3 extends object = {}
        > =
        Readonly<T1> &
        (T2 extends React.JSXElementConstructor<any>
          ? Omit<ExtractProps<T2>, 'children' | Components.BaseElementIgnoreProps | keyof T1 | keyof T3>
          : T2 extends object
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
    }

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

    type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> &
      Omit<T, K>;

    type DeepPartial<T> = {
      [P in keyof T]?: T[P] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : DeepPartial<T[P]>
    };

    type Widen<T> =
      T extends boolean ? boolean :
      T extends number ? number :
      T extends string ? string :
      T extends Function ? Function :
      T;

    type DeepWiden<T> =
      T extends ReadonlyArray<any> ? DeepWidenArray<T[number]> :
      T extends ReadonlyMap<infer R, infer I> ? DeepWidenMap<R, I> :
      T extends object ? DeepWidenObject<T> :
      Widen<T>;

    interface DeepWidenArray<T> extends Array<DeepWiden<T>> { }
    interface DeepWidenMap<T, U> extends Map<T, DeepWiden<U>> { }

    type DeepWidenObject<T> = {
      [P in keyof T]: DeepWiden<T[P]>;
    };

    type NonMatchingPropNames<T, X> = { [K in keyof T]: T[K] extends X ? never : K }[keyof T];

    type NonFunctionPropNames<T> = NonMatchingPropNames<T, Function>;

    type DeepMutable<T> =
      T extends any[] ? DeepMutableArray<T[number]> :
      T extends object ? DeepMutableObject<T> :
      T;
    interface DeepMutableArray<T> extends Array<DeepMutable<T>> { }
    type DeepMutableObject<T> = {
      -readonly [P in NonFunctionPropNames<T>]: DeepMutable<T[P]>;
    };

    type DeepReadonly<T> =
      T extends any[] ? DeepReadonlyArray<T[number]> :
      T extends object ? DeepReadonlyObject<T> :
      T;
    interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> { }
    type DeepReadonlyObject<T> = {
      +readonly [P in NonFunctionPropNames<T>]: DeepReadonly<T[P]>;
    };


    type DeepRequired<T> = NonNullable<
      T extends any[] ? DeepRequiredArray<T[number]> :
      T extends object ? DeepRequiredObject<T> :
      T
    >;
    interface DeepRequiredArray<T> extends Array<DeepRequired<T>> { }
    type DeepRequiredObject<T> = {
      [P in keyof T]+?: DeepRequired<T[P]>;
    };

    type ObjectIfObject<T> = T extends object ? (T extends readonly any[] ? never : (T extends Function ? never : (T extends ReadonlyMap<any, any> ? never : T))) : never

    type BranchIfObject<T, Posi, Nega> = ObjectIfObject<T> extends never ? Nega : Posi;

    type KeyofObjectIfObject<T> = ObjectIfObject<T> extends never ? never : keyof T;



    // type IntrinsicElementsKeys = JSX.IntrinsicElements[keyof JSX.IntrinsicElements];

    // type FunctionalComponent<P> = (props: P) => React.ReactElement | null;
    // type FunctionalComponentProps<
    //   T extends FunctionalComponent<any>
    // > = T extends FunctionalComponent<infer P> ? P : never;
  }
}
