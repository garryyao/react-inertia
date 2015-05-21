import React from 'react';
import Scrollbar from './scrollBar.js';
import ScrollStyle from './scrollStyles.js';

require('imports?global=>window!./animate');
var Scroller = require('imports?core=>window.core!exports?Scroller!scroller/src/Scroller.js')

class Scrollable extends React.Component {
  constructor(props) {
    super(props);
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

  componentDidMount() {
    window.addEventListener("resize", this.bindedHandleWindowResize);
    var scroller = this.scroller = new Scroller(this.handleScroll.bind(this), {
      // scroll options goes here
    });
    this.updateScroll();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.bindedHandleWindowResize);
  }

  computeSizes() {
    var realHeight = React.findDOMNode(this.refs.content).offsetHeight;
    var realWidth = React.findDOMNode(this.refs.content).offsetWidth;
    var container = React.findDOMNode(this);
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

  updateScroll() {
    var sizes = this.computeSizes();
    var scroller = this.scroller;
    scroller.setPosition(sizes.containerLeft, sizes.containerTop);
    scroller.setDimensions(sizes.containerWidth, sizes.containerHeight, sizes.realWidth, sizes.realHeight);
    scroller.options.scrollingX = sizes.scrollableX;
    scroller.options.scrollingY = sizes.scrollableY;
    this.setState(sizes);
  }

  handleScroll(left, top) {
    this.setState({
      leftPosition: left,
      topPosition: top
    });
  }

  // Events
  // ======

  handleTouchStart(e) {
    // Don't react if initial down happens on a form element
    if (e.target.tagName.match(/input|textarea|select/i)) {
      return;
    }

    this.scroller.doTouchStart(e.touches, e.timeStamp);
    e.preventDefault();
  }

  handleTouchMove(e) {
    e.preventDefault();
    this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
  }

  handleTouchEnd(e) {
    this.scroller.doTouchEnd(e.timeStamp);
  }

  handleWindowResize() {
    this.updateScroll();
  }

  canScrollY(state = this.state) {
    return state.scrollableY && this.props.vertical;
  }

  canScrollX(state = this.state) {
    return state.scrollableX && this.props.horizontal;
  }

  render() {

    var scrollbarY = this.canScrollY() ? (
      <Scrollbar
        realSize={this.state.realHeight}
        containerSize={this.state.containerHeight}
        position={-this.state.topPosition}
        type="vertical"/>
    ) : null;

    var scrollbarX = this.canScrollX() ? (
      <Scrollbar
        realSize={this.state.realWidth}
        containerSize={this.state.containerWidth}
        position={-this.state.leftPosition}
        type="horizontal"/>
    ) : null;

    var style = ScrollStyle(this.state.leftPosition, this.state.topPosition);

    var classes = 'scrollarea ' + this.props.className;
    var contentClasses = 'scrollarea-content ' + this.props.contentClassName
    return (
      <div className={classes}
           onTouchStart={this.handleTouchStart.bind(this)}
           onTouchMove={this.handleTouchMove.bind(this)}
           onTouchEnd={this.handleTouchEnd.bind(this)}>
        <div ref="content" style={style} className={contentClasses}>
          {this.props.children}
        </div>
        {scrollbarY}
        {scrollbarX}
      </div>
    );
  }
}

Scrollable.propTypes = {
  className: React.PropTypes.string,
  speed: React.PropTypes.number,
  contentClassName: React.PropTypes.string,
  vertical: React.PropTypes.bool,
  horizontal: React.PropTypes.bool
};

Scrollable.defaultProps = {
  speed: 1,
  vertical: true,
  horizontal: true,
  useCssTransform: true
};

export default Scrollable;
