import React from 'react';
import classNames from 'classnames';
import ScrollStyle from './scrollStyles.js';
import assign from 'object.assign';


class ScrollBar extends React.Component {
  constructor(props) {
    super(props);
    var newState = this.calculateState(props);
    this.state = {
      position: newState.position,
      scrollSize: newState.scrollSize,
      isDragging: false,
      isActive: false,
      lastClientPosition: 0
    }

    if (props.type === 'vertical') {
      this.bindedHandleMouseMove = this.handleMouseMoveForVertical.bind(this);
    } else {
      this.bindedHandleMouseMove = this.handleMouseMoveForHorizontal.bind(this);
    }

    this.bindedHandleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousemove", this.bindedHandleMouseMove);
    document.addEventListener("mouseup", this.bindedHandleMouseUp);
  }

  componentWillReceiveProps(nextProps) {
    var props = this.calculateState(nextProps);
    props.isActive = true;
    this.setState(props);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        isActive: false
      });
    }, 200);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.bindedHandleMouseMove);
    document.removeEventListener("mouseup", this.bindedHandleMouseUp);
  }

  calculateState(props) {
    var scrollSize = props.containerSize * props.containerSize / props.realSize;
    var multiplier = props.containerSize / props.realSize;
    var position = props.position * multiplier;

    return {
      scrollSize: scrollSize,
      position: position
    };
  }

  render() {
    var scrollStyle = this.createScrollStyles();
    var scrollbarClasses = classNames([
      'scrollbar-container',
      {
        'active': this.state.isDragging || this.state.isActive,
        'horizontal': this.props.type === 'horizontal',
        'vertical': this.props.type === 'vertical'
      }
    ]);

    return (
      <div className={scrollbarClasses}>
        <div className="scrollbar"
             style={scrollStyle}
             onMouseDown={this.handleMouseDown.bind(this)}
          >

        </div>
      </div>
    );
  }

  handleMouseMoveForHorizontal(e) {
    var multiplier = this.props.containerSize / this.props.realSize;
    if (this.state.isDragging) {
      e.preventDefault();
      var deltaX = this.state.lastClientPosition - e.clientX;
      this.setState({lastClientPosition: e.clientX});
      this.props.onMove(0, deltaX / multiplier);
    }
  }

  handleMouseMoveForVertical(e) {
    var multiplier = this.props.containerSize / this.props.realSize;
    if (this.state.isDragging) {
      e.preventDefault();
      var deltaY = this.state.lastClientPosition - e.clientY;
      this.setState({lastClientPosition: e.clientY});
      this.props.onMove(deltaY / multiplier, 0);
    }
  }

  handleMouseDown(e) {
    var lastClientPosition = this.props.type === 'vertical'
      ? e.clientY
      : e.clientX
    this.setState({isDragging: true, lastClientPosition: lastClientPosition});
  }

  handleMouseUp(e) {
    this.setState({isDragging: false});
  }

  createScrollStyles() {
    var style = {};
    var left = 0, top = 0;
    if (this.props.type === 'vertical') {
      style.height = this.state.scrollSize;
      top = this.state.position;
    } else {
      style.width = this.state.scrollSize;
      left = this.state.position;
    }
    return assign(style, ScrollStyle(left, top));
  }
}

ScrollBar.propTypes = {
  onMove: React.PropTypes.func,
  realSize: React.PropTypes.number,
  containerSize: React.PropTypes.number,
  position: React.PropTypes.number,
  type: React.PropTypes.oneOf(['vertical', 'horizontal'])
};

ScrollBar.defaultProps = {
  type: 'vertical',
  useCssTransform: true
}
export default ScrollBar;
