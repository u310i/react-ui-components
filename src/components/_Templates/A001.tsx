import React, { useState, useEffect, useRef } from 'react';
import { css, injectGlobal, sheet } from 'react-emotion';
import Header from 'components/_Sections/Header';
import { DivElement } from 'components';

export default ({ style, header }) => {
	return (
		<DivElement>
			<Header {...header} />
		</DivElement>
	);
};
