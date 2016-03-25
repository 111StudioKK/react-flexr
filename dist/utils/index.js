'use strict';

exports.__esModule = true;
exports.generateMatchMediaString = generateMatchMediaString;
exports.setBreakpoints = setBreakpoints;
exports.getBreakpoints = getBreakpoints;
exports.clearBreakpoints = clearBreakpoints;
exports.isDifferent = isDifferent;
exports.findBreakpoints = findBreakpoints;
exports.findMatch = findMatch;
exports.doubleUnit = doubleUnit;
exports.assign = assign;
var canUseDOM = exports.canUseDOM = function () {
  return typeof window !== 'undefined' && window.document && window.document.createElement && window.matchMedia;
}();

var settings = exports.settings = {
  palm: { max: 600 },
  lap: { max: 959, min: 601 },
  portable: { max: 959 },
  desk: { min: 960 }
};

function generateMatchMediaString(_ref) {
  var min = _ref.min;
  var max = _ref.max;

  var minStr = min ? '(min-width: ' + min + 'px)' : null;
  var maxStr = max ? '(max-width: ' + max + 'px)' : null;

  var str = minStr && maxStr ? minStr + ' and ' + maxStr : minStr || maxStr;

  return str;
}

var matchMediaQueries = exports.matchMediaQueries = Object.keys(settings).reduce(function (acc, breakpoint) {
  acc[breakpoint] = generateMatchMediaString(settings[breakpoint]);
  return acc;
}, {});

var mediaQueries = exports.mediaQueries = Object.keys(matchMediaQueries).reduce(function (acc, breakpoint) {
  acc[breakpoint] = '@media screen and ' + matchMediaQueries[breakpoint];
  return acc;
}, {});

var breakpoints = [];
var breakpointsString = '';

function setBreakpoints(arr) {
  breakpoints = arr;
  breakpointsString = breakpoints.toString();
  return breakpoints;
}

function getBreakpoints(asString) {
  return asString ? breakpointsString : [].concat(breakpoints);
}

function clearBreakpoints() {
  breakpoints = [];
  return breakpoints;
}

function isDifferent(arr) {
  return arr.toString() !== breakpointsString;
}

function findBreakpoints() {
  if (!canUseDOM) return getBreakpoints();

  var newBreakpoints = Object.keys(matchMediaQueries).filter(function (breakpoint) {
    return window.matchMedia(matchMediaQueries[breakpoint]).matches;
  });

  return isDifferent(newBreakpoints) && setBreakpoints(newBreakpoints);
}

var optimizedResize = exports.optimizedResize = function () {
  var callbacks = new Map();
  var running = false;

  function resize() {
    if (!running) {
      running = true;

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }
  }

  function runCallbacks() {
    callbacks.values().forEach(function (callback) {
      return callback();
    });
    running = false;
  }

  function addCallback(callback, key) {
    if (typeof callback === 'function') {
      callbacks.setItem(key || callback, callback);
    }
  }

  function removeCallback(key) {
    callbacks.delete(key);
  }

  return {
    init: function init(callback) {
      window.addEventListener('resize', resize);
      addCallback(callback);
    },
    add: function add(callback, key) {
      addCallback(callback, key);
    },
    remove: function remove(key) {
      removeCallback(key);
    }
  };
}();

function findMatch() {
  for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) {
    arr[_key] = arguments[_key];
  }

  var breakpoint = false;
  if (!arr || arr.length === 0) return breakpoint;
  if (breakpoints.length === 0) findBreakpoints();

  for (var i = 0, len = arr.length; i < len; i++) {
    if (breakpoints.indexOf(arr[i]) !== -1) {
      breakpoint = arr[i];
      break;
    }
  }

  return breakpoint;
}

var valunit = /(\d+)(\w+)/;
function doubleUnit(str) {
  var _str$match = str.match(valunit);

  var val = _str$match[1];
  var unit = _str$match[2];

  return '' + val * 2 + unit;
}

var vertical = exports.vertical = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end'
};

var horizontal = exports.horizontal = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
};

var variables = exports.variables = {
  gutter: '11px'
};

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var source = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        to[key] = source[key];
      }
    }
  }

  return to;
}
