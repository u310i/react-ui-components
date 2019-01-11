import React from 'react';

const Message = ({ symbol, ...props }) => {
  const viewBox = "0 0 38 34";
  const Inner = (
    <>
      <path d="M19.0675 0C8.5371 0 0 7.092 0 15.8401c0 5.5527 3.4417 10.4345 8.6471 13.2632.0083.0091.0221.0182.0434.0277.8433.3798.41 1.6817-.5651 2.8751-.742.9083-2.1668 1.8444-1.6251 1.8444.8667 0 2.7535-.4018 3.94-1.0597 1.7586-.9752 2.9897-1.8141 4.5758-1.469l-.0013-.0035a22.867 22.867 0 0 0 4.0527.3619c10.5309 0 19.0676-7.0916 19.0676-15.8401C38.1351 7.0921 29.5984 0 19.0675 0z" />
    </>
  );

  if (symbol) {
    return (
      <svg display="none">
        <symbol viewBox={viewBox} {...props}>
          {Inner}
        </symbol>
      </svg>
    );
  } else {
    return (
      <svg viewBox={viewBox} {...props}>
        {Inner}
      </svg>
    );
  }
};

export default Message;