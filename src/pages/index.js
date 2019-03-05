import React from 'react';
import ReactDOM from 'react-dom';
import './props/materials';
import 'scripts/polyfill';
import { resetGlobalStyle } from 'scripts';

// import App from './app';

// injectGlobal(resetGlobalCss);
// ReactDOM.render(<App />, document.getElementById('app'));

import { css, injectGlobal, sheet } from 'react-emotion';
import TestApp from './test/TestApp';

injectGlobal(resetGlobalStyle);

ReactDOM.render(<TestApp />, document.getElementById('app'));
