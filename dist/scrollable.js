'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _scrollTouchJs = require('./scrollTouch.js');

var _scrollTouchJs2 = _interopRequireDefault(_scrollTouchJs);

var _scrollMouseJs = require('./scrollMouse.js');

var _scrollMouseJs2 = _interopRequireDefault(_scrollMouseJs);

function isTouch() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

exports['default'] = isTouch() ? _scrollTouchJs2['default'] : _scrollMouseJs2['default'];
module.exports = exports['default'];