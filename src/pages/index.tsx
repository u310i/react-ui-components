import * as React from 'react';
import ReactDOM from 'react-dom';
// import './props/constants';
import '../scripts/polyfill/index.ts';
// import { resetGlobalStyle } from 'scripts';

// import App from './app2';

// injectGlobal(resetGlobalCss);
// ReactDOM.render(<App />, document.getElementById('app'));

// import { css, injectGlobal, sheet } from 'react-emotion';
import { App } from './Test';
// import {
//   BaseElement,
// } from 'components';
// injectGlobal(resetGlobalStyle);

ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render(<BaseElement>, document.getElementById('app'));
