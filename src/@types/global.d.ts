// import * as React from 'react';
import * as CSS from 'csstype';
import {
  TransitionProps as _TransitionProps,
  TransitionStatus as _TransitionStatus,
} from 'react-transition-group/Transition';

declare global {
  namespace $Type {
    namespace Components {}
    namespace Constants {
      namespace Transition {}
    }
    namespace Transition {
      type TransitionProps = _TransitionProps;
      type TransitionStatus = _TransitionStatus;
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

    interface FunctionComponentWithoutChildren<P = {}> {
      (props: P, context?: any): React.ReactElement | null;
      propTypes?: React.WeakValidationMap<P>;
      contextTypes?: React.ValidationMap<any>;
      defaultProps?: Partial<P>;
      displayName?: string;
    }

    type CreateProps<T, U = {}> = Readonly<T> & Omit<U, keyof T>;

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
