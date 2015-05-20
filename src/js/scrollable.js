import scrollTouch from './scrollTouch.js';
import scrollMouse from './scrollMouse.js';

function isTouch() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

export default isTouch() ? scrollTouch : scrollMouse;