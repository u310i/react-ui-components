import React from 'react';
import materials from './_materials';
import { roundNumber } from 'scripts';
import {
  SvgElement,
  GElement,
  SymbolElement,
  UseElement,
  TitleElement,
  DescElement
} from 'elements';

const mStyles = materials.styles;

const SVG = ({
  viewBox,
  path,
  tag,
  innerProps = {},
  symbol,
  use,
  xlinkHref,
  transform = false,
  title,
  desc,
  role = mStyles.role,
  style = {},
  ...props
}) => {
  const titleTag = title && <TitleElement>{title}</TitleElement>;
  const descTag = desc && <DescElement>{desc}</DescElement>;

  props.role = role;
  style.pointerEvents = mStyles.pointerEvents;
  props.style = style;

  let createGroupedComponent;
  if (transform) {
    const x = roundNumber(viewBox[2] / 2, 6);
    const y = roundNumber(viewBox[3] / 2, 6);

    const forInnerGroup = `translate(${x * -1}, ${y * -1})`;
    const forOuterGroup = `translate(${x}, ${y})`;

    innerProps = { transform: forInnerGroup, ...innerProps };

    createGroupedComponent = inner => (
      <GElement transform={forOuterGroup}>
        <GElement transform={transform}>{inner}</GElement>
      </GElement>
    );
  }

  const Path = path && <path {...innerProps} d={path} />;
  const Tag = !path && tag && (
    <GElement {...innerProps} dangerouslySetInnerHTML={{ __html: tag }} />
  );

  const InnerComponent = transform
    ? createGroupedComponent(Path || Tag)
    : Path || Tag;

  if (symbol) {
    return (
      <SvgElement
        display={mStyles.symbolDisplay}
        xmlns={mStyles.xmlns}
        xmlnsXlink={mStyles.xmlnsXlink}
      >
        <SymbolElement viewBox={viewBox.join(' ')} {...props}>
          {InnerComponent}
        </SymbolElement>
      </SvgElement>
    );
  }
  if (use) {
    return (
      <SvgElement
        {...props}
        xmlns={mStyles.xmlns}
        xmlnsXlink={mStyles.xmlnsXlink}
      >
        {titleTag}
        {descTag}
        <UseElement xlinkHref={xlinkHref} />
      </SvgElement>
    );
  } else {
    return (
      <SvgElement
        viewBox={viewBox.join(' ')}
        {...props}
        xmlns={mStyles.xmlns}
        xmlnsXlink={mStyles.xmlnsXlink}
      >
        {titleTag}
        {descTag}
        {InnerComponent}
      </SvgElement>
    );
  }
};

export default SVG;
