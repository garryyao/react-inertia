'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _scrollStylesJs = require('./scrollStyles.js');

var _scrollStylesJs2 = _interopRequireDefault(_scrollStylesJs);

var _objectAssign = require('object.assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var ScrollBar = (function (_React$Component) {
  function ScrollBar(props) {
    _classCallCheck(this, ScrollBar);

    _get(Object.getPrototypeOf(ScrollBar.prototype), 'constructor', this).call(this, props);
    var newState = this.calculateState(props);
    this.state = {
      position: newState.position,
      scrollSize: newState.scrollSize,
      isDragging: false,
      isActive: false,
      lastClientPosition: 0
    };

    if (props.type === 'vertical') {
      this.bindedHandleMouseMove = this.handleMouseMoveForVertical.bind(this);
    } else {
      this.bindedHandleMouseMove = this.handleMouseMoveForHorizontal.bind(this);
    }

    this.bindedHandleMouseUp = this.handleMouseUp.bind(this);
  }

  _inherits(ScrollBar, _React$Component);

  _createClass(ScrollBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('mousemove', this.bindedHandleMouseMove);
      document.addEventListener('mouseup', this.bindedHandleMouseUp);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this = this;

      var props = this.calculateState(nextProps);
      props.isActive = true;
      this.setState(props);
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this.setState({
          isActive: false
        });
      }, 200);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mousemove', this.bindedHandleMouseMove);
      document.removeEventListener('mouseup', this.bindedHandleMouseUp);
    }
  }, {
    key: 'calculateState',
    value: function calculateState(props) {
      var scrollSize = props.containerSize * props.containerSize / props.realSize;
      var multiplier = props.containerSize / props.realSize;
      var position = props.position * multiplier;

      return {
        scrollSize: scrollSize,
        position: position
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var scrollStyle = this.createScrollStyles();
      var scrollbarClasses = (0, _classnames2['default'])(['scrollbar-container', {
        'active': this.state.isDragging || this.state.isActive,
        'horizontal': this.props.type === 'horizontal',
        'vertical': this.props.type === 'vertical'
      }]);

      return _react2['default'].createElement(
        'div',
        { className: scrollbarClasses },
        _react2['default'].createElement('div', { className: 'scrollbar',
          style: scrollStyle,
          onMouseDown: this.handleMouseDown.bind(this)
        })
      );
    }
  }, {
    key: 'handleMouseMoveForHorizontal',
    value: function handleMouseMoveForHorizontal(e) {
      var multiplier = this.props.containerSize / this.props.realSize;
      if (this.state.isDragging) {
        e.preventDefault();
        var deltaX = this.state.lastClientPosition - e.clientX;
        this.setState({ lastClientPosition: e.clientX });
        this.props.onMove(0, deltaX / multiplier);
      }
    }
  }, {
    key: 'handleMouseMoveForVertical',
    value: function handleMouseMoveForVertical(e) {
      var multiplier = this.props.containerSize / this.props.realSize;
      if (this.state.isDragging) {
        e.preventDefault();
        var deltaY = this.state.lastClientPosition - e.clientY;
        this.setState({ lastClientPosition: e.clientY });
        this.props.onMove(deltaY / multiplier, 0);
      }
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      var lastClientPosition = this.props.type === 'vertical' ? e.clientY : e.clientX;
      this.setState({ isDragging: true, lastClientPosition: lastClientPosition });
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(e) {
      this.setState({ isDragging: false });
    }
  }, {
    key: 'createScrollStyles',
    value: function createScrollStyles() {
      var style = {};
      var left = 0,
          top = 0;
      if (this.props.type === 'vertical') {
        style.height = this.state.scrollSize;
        top = this.state.position;
      } else {
        style.width = this.state.scrollSize;
        left = this.state.position;
      }
      return (0, _objectAssign2['default'])(style, (0, _scrollStylesJs2['default'])(left, top));
    }
  }]);

  return ScrollBar;
})(_react2['default'].Component);

ScrollBar.propTypes = {
  onMove: _react2['default'].PropTypes.func,
  realSize: _react2['default'].PropTypes.number,
  containerSize: _react2['default'].PropTypes.number,
  position: _react2['default'].PropTypes.number,
  type: _react2['default'].PropTypes.oneOf(['vertical', 'horizontal'])
};

ScrollBar.defaultProps = {
  type: 'vertical',
  useCssTransform: true
};
exports['default'] = ScrollBar;
module.exports = exports['default'];