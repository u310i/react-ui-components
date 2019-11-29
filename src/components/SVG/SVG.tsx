import * as React from "react";
import $ from "./_constants";
import { roundNumber } from "scripts";
import BaseElement from "../BaseElement/BaseElement";

type ViewBox = $Type.Icon.ViewBox;

type SVGProps = $Type.Components.BaseElement._SVGProps;

type ComponentProps = {
  path?: $Type.Icon.Path;
  tag?: string;
  viewBox?: ViewBox;
  innerProps?: SVGProps;
  symbol?: boolean;
  symbolTagId?: string;
  symbolTagProps?: SVGProps;
  use?: boolean;
  useTagHref?: string;
  useTagProps?: SVGProps;
  transform?: string;
  title?: string;
  desc?: string;
};

type Props = $Type.MergeObject<ComponentProps, SVGProps>;

declare global {
  namespace $Type {
    namespace Components {
      namespace SVG {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const SVG: React.FC<Props> = ({
  children,
  path,
  tag,
  viewBox = [0, 0, 512, 512],
  innerProps: propInnerProps,
  symbol,
  symbolTagId,
  symbolTagProps,
  use,
  useTagHref,
  useTagProps,
  transform,
  title,
  desc,
  ...other
}) => {
  const [titleTag, descTag] = React.useMemo(() => {
    let titleTag: null | JSX.Element = title ? <title>{title}</title> : null;
    let descTag: null | JSX.Element = desc ? <desc>{desc}</desc> : null;
    return [titleTag, descTag];
  }, [title, desc]);

  const props = {
    _style_: $.styles.style,
    _className_: $.classNames.name,
    role: $.styles.role,
    xmlns: $.styles.xmlns,
    xmlnsXlink: $.styles.xmlnsXlink,
    ...other
  };

  let innerProps = React.useMemo(() => {
    return { ...propInnerProps };
  }, [propInnerProps]);

  let outerTransformValue: string | undefined;
  innerProps = React.useMemo(() => {
    if (transform === typeof "string" && viewBox) {
      const x = roundNumber(viewBox[2] / 2, 6);
      const y = roundNumber(viewBox[3] / 2, 6);

      const innerTransformValue = `translate(${x * -1}, ${y * -1})`;
      outerTransformValue = `translate(${x}, ${y})`;
      return { ...innerProps, transform: innerTransformValue };
    } else {
      return innerProps;
    }
  }, [transform, viewBox, innerProps]);

  let InnerComponent = React.useMemo(() => {
    return (
      (children && (
        <BaseElement
          {...innerProps}
          elementName="g"
          _className_={$.classNames.nameInner}
        >
          {children}
        </BaseElement>
      )) ||
      (path &&
        (typeof path === "string" ? (
          <BaseElement
            {...innerProps}
            elementName="path"
            _className_={$.classNames.nameInner}
            d={path}
          />
        ) : Array.isArray(path) ? (
          path.map(pathItem => {
            if (typeof pathItem !== "string") return null;
            return (
              <BaseElement
                {...innerProps}
                elementName="path"
                _className_={$.classNames.nameInner}
                d={pathItem}
              />
            );
          })
        ) : null)) ||
      (tag && (
        <BaseElement
          {...innerProps}
          elementName="g"
          _className_={$.classNames.nameInner}
          dangerouslySetInnerHTML={{ __html: tag }}
        />
      ))
    );
  }, [path, tag, innerProps]);

  InnerComponent = React.useMemo(() => {
    if (transform === typeof "string" && viewBox) {
      return (
        <g
          transform={outerTransformValue}
          className={$.classNames.nameTransformGroupOuter}
        >
          <g
            transform={transform}
            className={$.classNames.nameTransformGroupInner}
          >
            {InnerComponent}
          </g>
        </g>
      );
    } else {
      return InnerComponent;
    }
  }, [transform, outerTransformValue, InnerComponent]);

  if (symbol) {
    return (
      <BaseElement
        {...props}
        elementName="svg"
        display={$.styles.symbolDisplay}
      >
        <BaseElement
          {...symbolTagProps}
          elementName="symbol"
          viewBox={viewBox.join(" ")}
          id={symbolTagId}
          _className_={$.classNames.nameSymbol}
        >
          {titleTag}
          {descTag}
          {InnerComponent}
        </BaseElement>
      </BaseElement>
    );
  } else if (use) {
    return (
      <BaseElement {...props} elementName="svg">
        {titleTag}
        {descTag}
        <BaseElement
          {...useTagProps}
          elementName="use"
          xlinkHref={useTagHref}
          href={useTagHref}
          _className_={$.classNames.nameUse}
        />
      </BaseElement>
    );
  } else {
    return (
      <BaseElement {...props} elementName="svg" viewBox={viewBox.join(" ")}>
        {titleTag}
        {descTag}
        {InnerComponent}
      </BaseElement>
    );
  }
};

export default SVG;
