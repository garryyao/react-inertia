'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _scrollBarJs = require('./scrollBar.js');

var _scrollBarJs2 = _interopRequireDefault(_scrollBarJs);

var _scrollStylesJs = require('./scrollStyles.js');

var _scrollStylesJs2 = _interopRequireDefault(_scrollStylesJs);

require('imports?global=>window!./animate');
var Scroller = require('imports?core=>window.core!exports?Scroller!scroller/src/Scroller.js');

var Scrollable = (function (_React$Component) {
  function Scrollable(props) {
    _classCallCheck(this, Scrollable);

    _get(Object.getPrototypeOf(Scrollable.prototype), 'constructor', this).call(this, props);
    this.state = {
      leftPosition: 0,
      topPosition: 0,
      realHeight: 0,
      containerHeight: 0,
      realWidth: 0,
      containerWidth: 0,
      scrollableX: false,
      scrollableY: false
    };
    this.bindedHandleWindowResize = this.handleWindowResize.bind(this);
  }

  _inherits(Scrollable, _React$Component);

  _createClass(Scrollable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.bindedHandleWindowResize);
      var scroller = this.scroller = new Scroller(this.handleScroll.bind(this), {});
      this.updateScroll();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.bindedHandleWindowResize);
    }
  }, {
    key: 'computeSizes',
    value: function computeSizes() {
      var realHeight = _react2['default'].findDOMNode(this.refs.content).offsetHeight;
      var realWidth = _react2['default'].findDOMNode(this.refs.content).offsetWidth;
      var container = _react2['default'].findDOMNode(this);
      var rect = container.getBoundingClientRect();
      var containerLeft = rect.left + container.clientLeft;
      var containerTop = rect.top + container.clientTop;
      var containerHeight = container.offsetHeight;
      var containerWidth = container.offsetWidth;
      var scrollableY = realHeight > containerHeight;
      var scrollableX = realWidth > containerWidth;
      return {
        containerHeight: containerHeight,
        containerWidth: containerWidth,
        containerLeft: containerLeft,
        containerTop: containerTop,
        realHeight: realHeight,
        realWidth: realWidth,
        scrollableX: scrollableX,
        scrollableY: scrollableY
      };
    }
  }, {
    key: 'updateScroll',
    value: function updateScroll() {
      var sizes = this.computeSizes();
      var scroller = this.scroller;
      scroller.setPosition(sizes.containerLeft, sizes.containerTop);
      scroller.setDimensions(sizes.containerWidth, sizes.containerHeight, sizes.realWidth, sizes.realHeight);
      scroller.options.scrollingX = sizes.scrollableX;
      scroller.options.scrollingY = sizes.scrollableY;
      this.setState(sizes);
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(left, top) {
      this.setState({
        leftPosition: left,
        topPosition: top
      });
    }
  }, {
    key: 'handleTouchStart',

    // Events
    // ======

    value: function handleTouchStart(e) {
      // Don't react if initial down happens on a form element
      if (e.target.tagName.match(/input|textarea|select/i)) {
        return;
      }

      this.scroller.doTouchStart(e.touches, e.timeStamp);
      e.preventDefault();
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      e.preventDefault();
      this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      this.scroller.doTouchEnd(e.timeStamp);
    }
  }, {
    key: 'handleWindowResize',
    value: function handleWindowResize() {
      this.updateScroll();
    }
  }, {
    key: 'canScrollY',
    value: function canScrollY() {
      var state = arguments[0] === undefined ? this.state : arguments[0];

      return state.scrollableY && this.props.vertical;
    }
  }, {
    key: 'canScrollX',
    value: function canScrollX() {
      var state = arguments[0] === undefined ? this.state : arguments[0];

      return state.scrollableX && this.props.horizontal;
    }
  }, {
    key: 'render',
    value: function render() {

      var scrollbarY = this.canScrollY() ? _react2['default'].createElement(_scrollBarJs2['default'], {
        realSize: this.state.realHeight,
        containerSize: this.state.containerHeight,
        position: -this.state.topPosition,
        type: 'vertical' }) : null;

      var scrollbarX = this.canScrollX() ? _react2['default'].createElement(_scrollBarJs2['default'], {
        realSize: this.state.realWidth,
        containerSize: this.state.containerWidth,
        position: -this.state.leftPosition,
        type: 'horizontal' }) : null;

      var style = (0, _scrollStylesJs2['default'])(this.state.leftPosition, this.state.topPosition);

      var classes = 'scrollarea ' + this.props.className;
      var contentClasses = 'scrollarea-content ' + this.props.contentClassName;
      return _react2['default'].createElement(
        'div',
        { className: classes,
          onTouchStart: this.handleTouchStart.bind(this),
          onTouchMove: this.handleTouchMove.bind(this),
          onTouchEnd: this.handleTouchEnd.bind(this) },
        _react2['default'].createElement(
          'div',
          { ref: 'content', style: style, className: contentClasses },
          this.props.children
        ),
        scrollbarY,
        scrollbarX
      );
    }
  }]);

  return Scrollable;
})(_react2['default'].Component);

Scrollable.propTypes = {
  className: _react2['default'].PropTypes.string,
  speed: _react2['default'].PropTypes.number,
  contentClassName: _react2['default'].PropTypes.string,
  vertical: _react2['default'].PropTypes.bool,
  horizontal: _react2['default'].PropTypes.bool
};

Scrollable.defaultProps = {
  speed: 1,
  vertical: true,
  horizontal: true,
  useCssTransform: true
};

exports['default'] = Scrollable;
module.exports = exports['default'];

// scroll options goes here