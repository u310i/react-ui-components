import React from 'react';

const xmlns = 'http://www.w3.org/2000/svg';
const xmlnsXlink = 'http://www.w3.org/1999/xlink';

const SVG = ({ viewBox, inner, symbol, use, xlinkHref, ...props }) => {
  if (symbol || use) {
    if (symbol) {
      return (
        <svg display="none" xmlns={xmlns} xmlnsXlink={xmlnsXlink}>
          <symbol
            viewBox={viewBox}
            {...props}
            dangerouslySetInnerHTML={{ __html: inner }}
          />
        </svg>
      );
    } else {
      return (
        <svg {...props} xmlns={xmlns} xmlnsXlink={xmlnsXlink}>
          <use xlinkHref={xlinkHref} />
        </svg>
      );
    }
  } else {
    return (
      <svg
        viewBox={viewBox}
        {...props}
        xmlns={xmlns}
        xmlnsXlink={xmlnsXlink}
        dangerouslySetInnerHTML={{ __html: inner }}
      />
    );
  }
};

export default SVG;
