import * as React from 'react';
import $ from './_constants';
import { roundNumber } from 'scripts';
import { BaseElement } from '..';
import iconList from 'src/icons';

const $styles = $.styles;
const $names = $.names;

type ViewBox = [number, number, number, number];

type Props<T = $Type.Components.BaseElementSVGProps> = $Type.CreateProps<
  {
    path?: $Type.Icon.Path;
    tag?: string;
    viewBox?: ViewBox;
    innerProps?: T;
    symbol?: boolean;
    symbolTagId?: string;
    symbolTagProps?: T;
    use?: boolean;
    useTagHref?: string;
    useTagProps?: T;
    transform?: string;
    title?: string;
    desc?: string;
    role?: string;
    style?: React.CSSProperties;
  },
  $Type.Components.BaseElementSVGProps
>;

declare global {
  namespace $Type {
    namespace Components {
      type SVGProps = Props;
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
  role = $styles.role,
  style: propStyle,
  ...other
}) => {
  const titleTag = title && <title>{title}</title>;
  const descTag = desc && <desc>{desc}</desc>;

  const props = {
    style: React.useMemo(() => {
      return { pointerEvents: $styles.pointerEvents, ...propStyle };
    }, [propStyle]),
    _className_: $names.svg,
    role,
    ...other,
  };

  let innerProps = React.useMemo(() => {
    return { ...propInnerProps };
  }, [propInnerProps]);

  let outerTransformValue: string | undefined;
  innerProps = React.useMemo(() => {
    if (transform === typeof 'string' && viewBox) {
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
          elementName="g"
          _className_={$names.svgInner}
          {...innerProps}
        >
          {children}
        </BaseElement>
      )) ||
      (path &&
        (typeof path === 'string' ? (
          <BaseElement
            elementName="path"
            _className_={$names.svgInner}
            {...innerProps}
            d={path}
          />
        ) : Array.isArray(path) ? (
          path.map(pathItem => {
            if (typeof pathItem !== 'string') return null;
            return (
              <BaseElement
                elementName="path"
                _className_={$names.svgInner}
                {...innerProps}
                d={pathItem}
              />
            );
          })
        ) : null)) ||
      (tag && (
        <BaseElement
          elementName="g"
          _className_={$names.svgInner}
          {...innerProps}
          dangerouslySetInnerHTML={{ __html: tag }}
        />
      ))
    );
  }, [path, tag, innerProps]);

  InnerComponent = React.useMemo(() => {
    if (transform === typeof 'string' && viewBox) {
      return (
        <g
          transform={outerTransformValue}
          className={$names.svgTransformGroupOuter}
        >
          <g transform={transform} className={$names.svgTransformGroupInner}>
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
        elementName="svg"
        display={$styles.symbolDisplay}
        xmlns={$styles.xmlns}
        xmlnsXlink={$styles.xmlnsXlink}
        {...props}
      >
        <BaseElement
          elementName="symbol"
          viewBox={viewBox.join(' ')}
          id={symbolTagId}
          _className_={$names.svgSymbol}
          {...symbolTagProps}
        >
          {InnerComponent}
        </BaseElement>
      </BaseElement>
    );
  } else if (use) {
    return (
      <BaseElement
        elementName="svg"
        xmlns={$styles.xmlns}
        xmlnsXlink={$styles.xmlnsXlink}
        {...props}
      >
        {titleTag}
        {descTag}
        <BaseElement
          elementName="use"
          xlinkHref={useTagHref}
          href={useTagHref}
          _className_={$names.svgUse}
          {...useTagProps}
        />
      </BaseElement>
    );
  } else {
    return (
      <BaseElement
        elementName="svg"
        viewBox={viewBox.join(' ')}
        xmlns={$styles.xmlns}
        xmlnsXlink={$styles.xmlnsXlink}
        {...props}
      >
        {titleTag}
        {descTag}
        {InnerComponent}
      </BaseElement>
    );
  }
};

export default SVG;
