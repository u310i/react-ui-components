import * as React from "react";
import { css } from "emotion";
import { common as commonStyle } from "./style";
import htmlStyleMap from "./htmlStyleMap";
import inputHtmlStyleMap from "./inputHtmlStyleMap";
import { injectElementToRef } from "scripts";

type ComponentProps = {
  elementName?: keyof JSX.IntrinsicElements;
  type?: string;
  style?: React.CSSProperties;
  classNames?: string[];
  className?: string;
  ids?: string[];
  id?: string;
  arias?: React.AriaAttributes;
  refer?: $Type.ReactUtils.Ref<Element>;
  testid?: string;
};

type DirectOnlyProps = {
  _style_?: React.CSSProperties;
  _className_?: string;
  _id_?: string;
  _arias_?: React.AriaAttributes;
  _refer_?: $Type.ReactUtils.Ref<Element>;
};

type Props<
  T1 extends object = ComponentProps & DirectOnlyProps,
  T2 extends object = React.AllHTMLAttributes<Element>,
  T3 extends object = React.SVGAttributes<Element>
> = $Type.MergeObject<T1, $Type.MergeObject<T2, T3>>;

declare global {
  namespace $Type {
    namespace Components {
      namespace BaseElement {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
        type _GeneralProps = Omit<Props, keyof DirectOnlyProps>;
        type _SVGProps = ComponentProps &
          Omit<React.SVGAttributes<Element>, keyof ComponentProps>;
        type _DirectOnlyPropsKey = keyof DirectOnlyProps;
      }
    }
  }
}

const BaseElement: React.FC<Props> = ({
  elementName = "div",
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
      ...(elementName === "input" &&
        type &&
        inputHtmlStyleMap[type as keyof typeof inputHtmlStyleMap]),
      ..._style_,
      ...propStyle
    } as const;
  }, [_style_, propStyle, elementName, type]);

  const className = React.useMemo(() => {
    const mergedClassName =
      [
        css(style),
        ...(propClassName ? [propClassName] : []),
        ...(propClassNames || []),
        ...(_className_ ? [_className_] : [])
      ].join(" ") || "";
    return mergedClassName;
  }, [style, _className_, propClassNames, propClassName]);

  const id = React.useMemo(() => {
    return (
      [
        ...(propId ? [propId] : []),
        ...(propIds || []),
        ...(_id_ ? [_id_] : [])
      ].join(" ") || null
    );
  }, [_id_, propIds, propId]);

  const arias = React.useMemo(() => {
    return {
      ..._arias_,
      ...propArias
    } as React.AriaAttributes;
  }, [_arias_, propArias]);

  const refer = React.useCallback(
    (element: Element) => {
      injectElementToRef(propRefer, element);
      injectElementToRef(_refer_, element);
    },
    [propRefer, _refer_]
  );

  return React.createElement(
    elementName,
    {
      type: type,
      className: className,
      id: id,
      ref: refer,
      ...arias,
      ...other
    },
    children
  );
};

export default BaseElement;
