import React from 'react';

import { roundNumber } from 'scripts';
import {
  SvgElement,
  GElement,
  SymbolElement,
  UseElement,
  TitleElement,
  DescElement
} from 'elements';

const xml = {
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink'
};

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
  role = 'img',
  style = {},
  ...props
}) => {
  const titleTag = title && <TitleElement>{title}</TitleElement>;
  const descTag = desc && <DescElement>{desc}</DescElement>;

  props.role = role;
  style.pointerEvents = 'none';
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
      <SvgElement display="none" {...xml}>
        <SymbolElement viewBox={viewBox.join(' ')} {...props}>
          {InnerComponent}
        </SymbolElement>
      </SvgElement>
    );
  }
  if (use) {
    return (
      <SvgElement {...props} {...xml}>
        {titleTag}
        {descTag}
        <UseElement xlinkHref={xlinkHref} />
      </SvgElement>
    );
  } else {
    return (
      <SvgElement viewBox={viewBox.join(' ')} {...props} {...xml}>
        {titleTag}
        {descTag}
        {InnerComponent}
      </SvgElement>
    );
  }
};

export default SVG;
