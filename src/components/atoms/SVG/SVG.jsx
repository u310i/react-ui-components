import React from 'react';
import { css, cx } from 'react-emotion';

const xml = {
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink'
};

const SVG = ({
  viewBox,
  inner,
  symbol,
  use,
  xlinkHref,
  className,
  style: propStyle,
  ...props
}) => {
  const compositStyle = cx(className, css(propStyle));

  if (symbol || use) {
    if (symbol) {
      return (
        <svg display="none" {...xml}>
          <symbol
            viewBox={viewBox}
            className={compositStyle}
            {...props}
            dangerouslySetInnerHTML={{ __html: inner }}
          />
        </svg>
      );
    } else {
      return (
        <svg className={compositStyle} {...props} {...xml}>
          <use xlinkHref={xlinkHref} />
        </svg>
      );
    }
  } else {
    return (
      <svg
        viewBox={viewBox}
        className={compositStyle}
        {...props}
        {...xml}
        dangerouslySetInnerHTML={{ __html: inner }}
      />
    );
  }
};

export default SVG;
