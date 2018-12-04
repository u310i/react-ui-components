import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
console.log('index-outer');
console.log(document.body.clientWidth);
ReactDOM.render(<App />, document.getElementById('app'));
