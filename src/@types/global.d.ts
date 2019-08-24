// import * as React from 'react';
import * as CSS from 'csstype';

import BaseElementProps = $Type.BaseElementProps;

declare global {
  namespace $Type {
    namespace Components {}
    namespace Constants {
      namespace Transition {}
    }
    namespace Transition {
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
    }

    // type CreateProps<
    //   T1,
    //   T2 extends keyof JSX.IntrinsicElements | '' = '',
    //   T3 extends {} = {}
    // > = Readonly<T1> &
    //   T3 &
    //   (T2 extends keyof JSX.IntrinsicElements
    //     ? Omit<
    //         Partial<BaseElementProps> &
    //           Omit<JSX.IntrinsicElements[T2], keyof BaseElementProps>,
    //         keyof T1
    //       >
    //     : {});

    type CreateProps<
      T1,
      T2 extends React.JSXElementConstructor<any> | {} = {},
      T3 extends {} = {}
    > = Readonly<T1> &
      (T2 extends React.JSXElementConstructor<infer P>
        ? Omit<Partial<P>, keyof T1>
        : {}) &
      Omit<T3, keyof T1>;

    // type SpecificPartial<T, K extends keyof T> = Partial<Pick<T, K>> &
    //   Omit<T, K>;

    type FunctionComponentWithoutChildren<P = {}> = {
      (props: P, context?: any): React.ReactElement | null;
      propTypes?: React.WeakValidationMap<P>;
      contextTypes?: React.ValidationMap<any>;
      defaultProps?: Partial<P>;
      displayName?: string;
    };

    type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> &
      Omit<T, K>;

    type Refer =
      | {
          current: Element | null;
        }
      | ((element: Element | null) => void);

    // type IntrinsicElementsKeys = JSX.IntrinsicElements[keyof JSX.IntrinsicElements];

    // type FunctionalComponent<P> = (props: P) => React.ReactElement | null;
    // type FunctionalComponentProps<
    //   T extends FunctionalComponent<any>
    // > = T extends FunctionalComponent<infer P> ? P : never;
  }
}
