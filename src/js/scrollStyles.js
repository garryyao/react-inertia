var getScrollStyles = (function (global) {

  var docStyle = document.documentElement.style;

  var engine;
  if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
    engine = 'presto';
  } else if ('MozAppearance' in docStyle) {
    engine = 'gecko';
  } else if ('WebkitAppearance' in docStyle) {
    engine = 'webkit';
  } else if (typeof navigator.cpuClass === 'string') {
    engine = 'trident';
  }

  var vendorPrefix = ({
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O'
  })[engine];

  var helperElem = document.createElement('div');
  var undef;

  var perspectiveProperty = vendorPrefix + 'Perspective';
  var transformProperty = vendorPrefix + 'Transform';

  if (helperElem.style[perspectiveProperty] !== undef) {

    return function (left, top) {
      var style = {};
      style[transformProperty] = 'translate3d(' + -left + 'px,' + -top + 'px,0)';
      return style;
    };
  } else if (helperElem.style[transformProperty] !== undef) {

    return function (left, top) {
      var style = {};
      style[transformProperty] = 'translate(' + -left + 'px,' + -top + 'px)';
      return style;
    };
  } else {
    return function (left, top) {
      var style = {};
      style.marginLeft = left ? -left + 'px' : '';
      style.marginTop = top ? -top + 'px' : '';
      return style;
    };
  }
})(window);

export default getScrollStyles;