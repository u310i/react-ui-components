// import * as React from 'react';
import * as CSS from "csstype";
import { keyframes } from "emotion";
import { Component, ComponentSpec } from "react";

declare global {
  export namespace $Type {
    namespace ReactUtils {
      type ExtractProps<
        P extends React.JSXElementConstructor<any>
      > = P extends React.JSXElementConstructor<infer P> ? P : {};

      type AvailableProps = React.JSXElementConstructor<any> | object;

      // type ExtractProps<P extends AvailableProps> = Omit<
      //   P extends React.JSXElementConstructor<any>
      //   ? ExtractPropsFromComponent<P>
      //   : P extends object
      //   ? P
      //   : {}
      //   , 'children'>

      // type CreateProps<
      //   P1 extends object = {},
      //   P2 extends AvailableProps = {},
      //   P3 extends object = {}
      //   > =
      //   Readonly<P1> &
      //   (P2 extends React.JSXElementConstructor<any>
      //     ? Omit<ExtractPropsFromComponent<P2>, keyof P1 | keyof P3>
      //     : P2 extends object
      //     ? Omit<P2, keyof P1 | keyof P3>
      //     : {}) &
      //   Partial<Omit<P3, keyof P1>>;

      // type SpecificPartial<T, K extends keyof T> = Partial<Pick<T, K>> &
      //   Omit<T, K>;

      // type FCWithoutChildren<P = {}> = {
      //   (props: P, context?: any): React.ReactElement | null;
      //   propTypes?: React.WeakValidationMap<P>;
      //   contextTypes?: React.ValidationMap<any>;
      //   defaultProps?: Partial<P>;
      //   displayName?: string;
      // };

      // type CreatePropComponentProps<
      //   C extends React.JSXElementConstructor<any>
      //   > = Omit<ExtractPropsFromComponent<C>, 'children' | Components.$BaseElement.DirectOnlyPropsKey>;

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

    namespace Components {}
    namespace Animation {
      type Keyframes = ReturnType<typeof keyframes>;
    }
    namespace Utils {
      type FontSize = number | string;
    }
    namespace Constants {
      namespace Origin {
        type Shape = "corner" | "default" | "round" | "circle";
      }
      type All = {
        backdrop: Constants.Components.Backdrop;
        button: Constants.Components.Button;
        collapse: Constants.Components.Collapse;
        dialog: Constants.Components.Dialog;
        drawer: Constants.Components.Drawer;
        fade: Constants.Components.Fade;
        grow: Constants.Components.Grow;
        icon: Constants.Components.Icon;
        // list: Constants.Components.List;
        modal: Constants.Components.Modal;
        onlyScreenReader: Constants.Components.OnlyScreenReader;
        paper: Constants.Components.Paper;
        slide: Constants.Components.Slide;
        sticky: Constants.Components.Sticky;
        svg: Constants.Components.SVG;
        swipeableDrawer: Constants.Components.SwipeableDrawer;
        zoom: Constants.Components.Zoom;
      };
      namespace Components {}
    }
    namespace Transition {
      type CommonProps = MergeObject<
        {
          in?: boolean;
          duration?: Duration;
          easing?: Easing;
          hideVisibility?: boolean;
          disableEnter?: boolean;
        },
        Components.CSSTransition._Props
      >;

      type AllProps = MergeObject<
        CommonProps &
          Components.Slide._CharacteristicProps &
          Components.Collapse._CharacteristicProps,
        Components.BaseElement._GeneralProps
      >;

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

      type PropTransitionComponentCommonProps<
        P1 = Components.CSSTransition._Props,
        P2 = CommonProps,
        P3 = Components.BaseElement._Props
      > = Omit<P1, "timeout"> &
        Omit<P2, keyof P1> &
        Omit<P3, keyof P1 | keyof P2>;
    }

    type AnyObject = { [key: string]: any };

    type MergeObject<P1 extends object, P2 extends object> = P1 &
      Omit<P2, keyof P1>;

    type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> &
      Omit<T, K>;

    type DeepPartial<T> = {
      [P in keyof T]?: T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : DeepPartial<T[P]>;
    };

    type Widen<T> = T extends boolean
      ? boolean
      : T extends number
      ? number
      : T extends string
      ? string
      : T extends Function
      ? Function
      : T;

    type DeepWiden<T> = T extends ReadonlyArray<any>
      ? DeepWidenArray<T[number]>
      : T extends ReadonlyMap<infer R, infer I>
      ? DeepWidenMap<R, I>
      : T extends object
      ? DeepWidenObject<T>
      : Widen<T>;

    interface DeepWidenArray<T> extends Array<DeepWiden<T>> {}
    interface DeepWidenMap<T, U> extends Map<T, DeepWiden<U>> {}

    type DeepWidenObject<T> = {
      [P in keyof T]: DeepWiden<T[P]>;
    };

    type NonMatchingPropNames<T, X> = {
      [K in keyof T]: T[K] extends X ? never : K;
    }[keyof T];

    type NonFunctionPropNames<T> = NonMatchingPropNames<T, Function>;

    type DeepMutable<T> = T extends any[]
      ? DeepMutableArray<T[number]>
      : T extends object
      ? DeepMutableObject<T>
      : T;
    interface DeepMutableArray<T> extends Array<DeepMutable<T>> {}
    type DeepMutableObject<T> = {
      -readonly [P in NonFunctionPropNames<T>]: DeepMutable<T[P]>;
    };

    type DeepReadonly<T> = T extends any[]
      ? DeepReadonlyArray<T[number]>
      : T extends object
      ? DeepReadonlyObject<T>
      : T;
    interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}
    type DeepReadonlyObject<T> = {
      +readonly [P in NonFunctionPropNames<T>]: DeepReadonly<T[P]>;
    };

    type DeepRequired<T> = NonNullable<
      T extends any[]
        ? DeepRequiredArray<T[number]>
        : T extends object
        ? DeepRequiredObject<T>
        : T
    >;
    interface DeepRequiredArray<T> extends Array<DeepRequired<T>> {}
    type DeepRequiredObject<T> = {
      [P in keyof T]+?: DeepRequired<T[P]>;
    };

    type IsObject<T> = T extends object
      ? (T extends readonly any[]
          ? false
          : (T extends Function
              ? false
              : (T extends ReadonlyMap<any, any> ? false : true)))
      : false;

    type BranchIfObject<T, Posi, Nega> = IsObject<T> extends false
      ? Nega
      : Posi;

    type KeyOfObject<T> = IsObject<T> extends false ? never : keyof T;

    // type IntrinsicElementsKeys = JSX.IntrinsicElements[keyof JSX.IntrinsicElements];

    // type FunctionalComponent<P> = (props: P) => React.ReactElement | null;
    // type FunctionalComponentProps<
    //   T extends FunctionalComponent<any>
    // > = T extends FunctionalComponent<infer P> ? P : never;
  }
}
