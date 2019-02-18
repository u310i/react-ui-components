import React from 'react';
import ReactDOM from 'react-dom';
import 'scripts/polyfill';
import { resetGlobalStyle } from 'scripts';

// import App from './app';

// injectGlobal(resetGlobalCss);
// ReactDOM.render(<App />, document.getElementById('app'));

import { css, injectGlobal, sheet } from 'react-emotion';
import Test from './test/testList';

injectGlobal(resetGlobalStyle);

ReactDOM.render(<Test />, document.getElementById('app'));
