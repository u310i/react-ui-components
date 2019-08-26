import * as React from 'react';
import $ from './_constants';
import { roundNumber } from 'scripts';
import { BaseElement } from '..';

const $styles = $.styles;
const $names = $.names;

type ViewBox = [number, number, number, number];

type Props = ({ path?: string; tag: string } | { path: string; tag?: string }) &
  $Type.CreateProps<
    {
      viewBox: ViewBox;
      innerProps: React.SVGAttributes<Element>;
      symbol: boolean;
      symbolTagId: string;
      symbolTagProps: React.SVGAttributes<Element>;
      use: boolean;
      useTagHref: string;
      useTagProps: React.SVGAttributes<Element>;
      transform?: string;
      title?: string;
      desc?: string;
      role?: string;
      style?: React.CSSProperties;
    },
    typeof BaseElement
  >;

const SVG: React.FC<Props> = ({
  viewBox,
  path,
  tag,
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
    _className_: $names.ucSVG,
    role,
    ...other,
  };

  let innerProps = React.useMemo(() => {
    return { ...propInnerProps };
  }, [propInnerProps]);

  let outerTransformValue: string | undefined;
  innerProps = React.useMemo(() => {
    if (transform === typeof 'string') {
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
      (path && (
        <BaseElement
          elementName="path"
          _className_={$names.ucSVGInner}
          {...innerProps}
          d={path}
        />
      )) ||
      (tag && (
        <BaseElement
          elementName="g"
          _className_={$names.ucSVGInner}
          {...innerProps}
          dangerouslySetInnerHTML={{ __html: tag }}
        />
      ))
    );
  }, [path, tag, innerProps]);

  InnerComponent = React.useMemo(() => {
    if (transform === typeof 'string') {
      return (
        <g
          transform={outerTransformValue}
          className={$names.ucSVGTransformGroupOuter}
        >
          <g transform={transform} className={$names.ucSVGTransformGroupInner}>
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
          _className_={$names.ucSVGSymbol}
          {...symbolTagProps}
        >
          {InnerComponent}
        </BaseElement>
      </BaseElement>
    );
  }
  if (use) {
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
          _className_={$names.ucSVGUse}
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
