import React from 'react';

class Scrollable extends React.Component {
  constructor(props) {
    super(props);
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

  componentDidMount() {
    window.addEventListener("resize", this.bindedHandleWindowResize);
    this.setSizesToState();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.bindedHandleWindowResize);
  }

  componentDidUpdate() {
    this.setSizesToState();
  }

  render() {
    var style = {
      marginTop: this.state.topPosition,
      marginLeft: this.state.leftPosition
    };

    var classes = 'scrollarea ' + this.props.className;
    var contentClasses = 'scrollarea-content ' + this.props.contentClassName
    return (
      <div className={classes} onWheel={this.handleWheel.bind(this)}>
        <div ref="content" style={style} className={contentClasses}>
          {this.props.children}
        </div>
      </div>
    );
  }

  handleMove(deltaY, deltaX) {
    var newState = this.computeSizes();
    if (this.canScrollY(newState)) {
      newState.topPosition = this.computeTopPosition(deltaY);
    }
    if (this.canScrollX(newState)) {
      newState.leftPosition = this.computeLeftPosition(deltaX);
    }
    this.setState(newState);
  }

  handleWheel(e) {
    var newState = this.computeSizes();
    var deltaY = e.deltaY * this.props.speed;
    var deltaX = e.deltaX * this.props.speed;

    if (this.canScrollY(newState)) {
      newState.topPosition = this.computeTopPosition(-deltaY);
    }

    if (this.canScrollX(newState)) {
      newState.leftPosition = this.computeLeftPosition(-deltaX);
    }

    if (this.state.topPosition !== newState.topPosition ||
      this.state.leftPosition !== newState.leftPosition) {
      e.preventDefault();
    }

    this.setState(newState);
  }

  computeTopPosition(deltaY) {
    var newTopPosition = this.state.topPosition + deltaY;
    if (-newTopPosition > this.state.realHeight - this.state.containerHeight) {
      newTopPosition = -(this.state.realHeight - this.state.containerHeight);
    }
    else if (newTopPosition > 0) {
      newTopPosition = 0;
    }

    return newTopPosition;
  }

  computeLeftPosition(deltaX) {
    var newLeftPosition = this.state.leftPosition + deltaX;
    if (-newLeftPosition > this.state.realWidth - this.state.containerWidth) {
      newLeftPosition = -(this.state.realWidth - this.state.containerWidth);
    }
    else if (newLeftPosition > 0) {
      newLeftPosition = 0;
    }

    return newLeftPosition;
  }

  handleWindowResize() {
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

  computeSizes() {
    var realHeight = React.findDOMNode(this.refs.content).offsetHeight;
    var containerHeight = React.findDOMNode(this).offsetHeight;
    var realWidth = React.findDOMNode(this.refs.content).offsetWidth;
    var containerWidth = React.findDOMNode(this).offsetWidth;
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

  setSizesToState() {
    var sizes = this.computeSizes();
    if (sizes.realHeight !== this.state.realHeight ||
      sizes.realWidth !== this.state.realWidth) {
      this.setState(sizes);
    }
  }

  canScrollY(state = this.state) {
    return state.scrollableY && this.props.vertical;
  }

  canScrollX(state = this.state) {
    return state.scrollableX && this.props.horizontal;
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
  horizontal: true
};

export default Scrollable;
