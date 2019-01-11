import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import 'utilities/polyfill';

import App from './app';
import Test from './test/testIndex';
const array1 = [1, 2, 3];

ReactDOM.render(<App />, document.getElementById('app'));
