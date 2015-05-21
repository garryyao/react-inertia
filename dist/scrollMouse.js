"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var Scrollable = (function (_React$Component) {
  function Scrollable(props) {
    _classCallCheck(this, Scrollable);

    _get(Object.getPrototypeOf(Scrollable.prototype), "constructor", this).call(this, props);
    this.state = {
      // aka. scrollTop
      topPosition: 0,
      // aka. scrollLeft
      leftPosition: 0,
      // aka. scrollHeight
      realHeight: 0,
      // aka. clientHeight
      containerHeight: 0,
      // aka. scrollWidth
      realWidth: 0,
      // aka. clientWidth
      containerWidth: 0,
      // if content has horizontally overflowed
      scrollableX: false,
      // if content has vertically overflowed
      scrollableY: false
    };

    this.bindedHandleWindowResize = this.handleWindowResize.bind(this);
  }

  _inherits(Scrollable, _React$Component);

  _createClass(Scrollable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("resize", this.bindedHandleWindowResize);
      this.setSizesToState();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.bindedHandleWindowResize);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.setSizesToState();
    }
  }, {
    key: "render",
    value: function render() {
      var style = {
        marginTop: this.state.topPosition,
        marginLeft: this.state.leftPosition
      };

      var classes = "scrollarea " + this.props.className;
      var contentClasses = "scrollarea-content " + this.props.contentClassName;
      return _react2["default"].createElement(
        "div",
        { className: classes, onWheel: this.handleWheel.bind(this) },
        _react2["default"].createElement(
          "div",
          { ref: "content", style: style, className: contentClasses },
          this.props.children
        )
      );
    }
  }, {
    key: "handleMove",
    value: function handleMove(deltaY, deltaX) {
      var newState = this.computeSizes();
      if (this.canScrollY(newState)) {
        newState.topPosition = this.computeTopPosition(deltaY);
      }
      if (this.canScrollX(newState)) {
        newState.leftPosition = this.computeLeftPosition(deltaX);
      }
      this.setState(newState);
    }
  }, {
    key: "handleWheel",
    value: function handleWheel(e) {
      var newState = this.computeSizes();
      var deltaY = e.deltaY * this.props.speed;
      var deltaX = e.deltaX * this.props.speed;

      if (this.canScrollY(newState)) {
        newState.topPosition = this.computeTopPosition(-deltaY);
      }

      if (this.canScrollX(newState)) {
        newState.leftPosition = this.computeLeftPosition(-deltaX);
      }

      if (this.state.topPosition !== newState.topPosition || this.state.leftPosition !== newState.leftPosition) {
        e.preventDefault();
      }

      this.setState(newState);
    }
  }, {
    key: "computeTopPosition",
    value: function computeTopPosition(deltaY) {
      var newTopPosition = this.state.topPosition + deltaY;
      if (-newTopPosition > this.state.realHeight - this.state.containerHeight) {
        newTopPosition = -(this.state.realHeight - this.state.containerHeight);
      } else if (newTopPosition > 0) {
        newTopPosition = 0;
      }

      return newTopPosition;
    }
  }, {
    key: "computeLeftPosition",
    value: function computeLeftPosition(deltaX) {
      var newLeftPosition = this.state.leftPosition + deltaX;
      if (-newLeftPosition > this.state.realWidth - this.state.containerWidth) {
        newLeftPosition = -(this.state.realWidth - this.state.containerWidth);
      } else if (newLeftPosition > 0) {
        newLeftPosition = 0;
      }

      return newLeftPosition;
    }
  }, {
    key: "handleWindowResize",
    value: function handleWindowResize() {
      var newState = this.computeSizes();
      var bottomPosition = newState.realHeight - newState.containerHeight;
      if (-this.state.topPosition >= bottomPosition) {
        newState.topPosition = this.canScrollY(newState) ? -bottomPosition : 0;
      }

      var rightPosition = newState.realWidth - newState.containerWidth;
      if (-this.state.leftPosition >= rightPosition) {
        newState.leftPosition = this.canScrollX(newState) ? -rightPosition : 0;
      }

      this.setState(newState);
    }
  }, {
    key: "computeSizes",
    value: function computeSizes() {
      var realHeight = _react2["default"].findDOMNode(this.refs.content).offsetHeight;
      var containerHeight = _react2["default"].findDOMNode(this).offsetHeight;
      var realWidth = _react2["default"].findDOMNode(this.refs.content).offsetWidth;
      var containerWidth = _react2["default"].findDOMNode(this).offsetWidth;
      var scrollableY = realHeight > containerHeight;
      var scrollableX = realWidth > containerWidth;

      return {
        realHeight: realHeight,
        containerHeight: containerHeight,
        realWidth: realWidth,
        containerWidth: containerWidth,
        scrollableX: scrollableX,
        scrollableY: scrollableY
      };
    }
  }, {
    key: "setSizesToState",
    value: function setSizesToState() {
      var sizes = this.computeSizes();
      if (sizes.realHeight !== this.state.realHeight || sizes.realWidth !== this.state.realWidth) {
        this.setState(sizes);
      }
    }
  }, {
    key: "canScrollY",
    value: function canScrollY() {
      var state = arguments[0] === undefined ? this.state : arguments[0];

      return state.scrollableY && this.props.vertical;
    }
  }, {
    key: "canScrollX",
    value: function canScrollX() {
      var state = arguments[0] === undefined ? this.state : arguments[0];

      return state.scrollableX && this.props.horizontal;
    }
  }]);

  return Scrollable;
})(_react2["default"].Component);

Scrollable.propTypes = {
  className: _react2["default"].PropTypes.string,
  speed: _react2["default"].PropTypes.number,
  contentClassName: _react2["default"].PropTypes.string,
  vertical: _react2["default"].PropTypes.bool,
  horizontal: _react2["default"].PropTypes.bool
};

Scrollable.defaultProps = {
  speed: 1,
  vertical: true,
  horizontal: true
};

exports["default"] = Scrollable;
module.exports = exports["default"];