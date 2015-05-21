import React from 'react';
import App from './app.jsx';

var css = require("style!css!../../css/scrollbar.css");

React.render(React.createElement(App, {itemsCount: 100}), document.getElementById("main"));
