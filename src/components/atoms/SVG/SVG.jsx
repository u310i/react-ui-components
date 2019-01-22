import React from 'react';
import { css, cx } from 'react-emotion';

import { roundNumber } from 'utilities/utils';

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
  className,
  style: propStyle,
  transform = false,
  ...props
}) => {
  const compositStyle = cx(className, css(propStyle));

  let TransformHoc;
  if (transform) {
    const x = roundNumber(viewBox[2] / 2, 6);
    const y = roundNumber(viewBox[3] / 2, 6);

    const forInnerGroup = `translate(${x * -1}, ${y * -1})`;
    const forOuterGroup = `translate(${x}, ${y})`;

    innerProps = { transform: forInnerGroup, ...innerProps };

    TransformHoc = inner => (
      <g transform={forOuterGroup}>
        <g transform={transform}>{inner}</g>
      </g>
    );
  }

  const Path = path && <path {...innerProps} d={path} />;
  const Tag = !path && tag && (
    <g {...innerProps} dangerouslySetInnerHTML={{ __html: tag }} />
  );

  const InnerComponent = transform ? TransformHoc(Path || Tag) : Path || Tag;

  if (symbol) {
    return (
      <svg display="none" {...xml}>
        <symbol
          viewBox={viewBox.join(' ')}
          className={compositStyle}
          {...props}
        >
          {InnerComponent}
        </symbol>
      </svg>
    );
  }
  if (use) {
    return (
      <svg className={compositStyle} {...props} {...xml}>
        <use xlinkHref={xlinkHref} />
      </svg>
    );
  } else {
    return (
      <svg
        viewBox={viewBox.join(' ')}
        className={compositStyle}
        {...props}
        {...xml}
      >
        {InnerComponent}
      </svg>
    );
  }
};

export default SVG;
