import React, { useState, useEffect, useRef } from 'react';
import { css, injectGlobal, sheet } from 'react-emotion';
import Header from 'components/_Sections/Header';

export default ({ style, header }) => {
  return (
    <div>
      <Header {...header} />
    </div>
  );
};
