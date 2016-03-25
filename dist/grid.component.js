'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _stylesheet = require('./stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _stilr = require('stilr');

var _stilr2 = _interopRequireDefault(_stilr);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = _stilr2.default.create({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    margin: '0 -' + _utils.variables.gutter + ' ' + (0, _utils.doubleUnit)(_utils.variables.gutter)
  },
  leftHorizontal: {
    justifyContent: _utils.horizontal.left
  },
  centerHorizontal: {
    justifyContent: _utils.horizontal.center
  },
  rightHorizontal: {
    justifyContent: _utils.horizontal.right
  },
  topVertical: {
    alignItems: _utils.vertical.top
  },
  centerVertical: {
    alignItems: _utils.vertical.center
  },
  bottomVertical: {
    alignItems: _utils.vertical.bottom
  }
}, _stylesheet2.default);

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    (0, _utils.findBreakpoints)();
    return _this;
  }

  Grid.prototype.render = function render() {
    var _props = this.props;
    var gutter = _props.gutter;
    var style = _props.style;
    var align = _props.align;
    var hAlign = _props.hAlign;
    var flexCells = _props.flexCells;
    var children = _props.children;
    var className = _props.className;

    var rest = _objectWithoutProperties(_props, ['gutter', 'style', 'align', 'hAlign', 'flexCells', 'children', 'className']);

    this.styles = (0, _utils.assign)({}, style, gutter ? { margin: '0 -' + gutter + ' ' + (0, _utils.doubleUnit)(gutter) } : null);

    var classes = [styles.base, className, align ? styles[align + 'Vertical'] : null, hAlign ? styles[hAlign + 'Horizontal'] : null].filter(Boolean).join(' ');

    var parentProps = {};
    if (gutter) parentProps.gutter = gutter;
    if (flexCells) parentProps.flex = true;

    var wrappedChildren = Object.keys(parentProps).length ? _react2.default.Children.map(children, function (child) {
      return child ? _react2.default.cloneElement(child, _extends({}, parentProps)) : child;
    }) : children;

    return _react2.default.createElement(
      'div',
      _extends({}, rest, {
        style: this.styles,
        className: classes }),
      wrappedChildren
    );
  };

  return Grid;
}(_react.Component);

Grid.propTypes = {
  gutter: _react.PropTypes.string,
  flexCells: _react.PropTypes.bool,
  align: _react.PropTypes.oneOf(['top', 'center', 'bottom'])
};
exports.default = Grid;
