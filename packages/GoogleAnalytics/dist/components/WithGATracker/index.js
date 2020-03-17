"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithGATracker = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _helpers = require("../../helpers");

var WithGATracker = function WithGATracker(WrappedComponent) {
  var WithGATrackerHOC = function (_Component) {
    (0, _inherits2["default"])(WithGATrackerHOC, _Component);

    function WithGATrackerHOC() {
      (0, _classCallCheck2["default"])(this, WithGATrackerHOC);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(WithGATrackerHOC).apply(this, arguments));
    }

    (0, _createClass2["default"])(WithGATrackerHOC, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var page = "".concat(this.props.location.pathname).concat(this.props.location.search);
        (0, _helpers.trackPage)(page);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var location = this.props.location;
        var previousPage = prevProps.location.pathname + prevProps.location.search;
        var currentPage = location.pathname + location.search;

        if (previousPage !== currentPage) {
          (0, _helpers.trackPage)(currentPage);
        }
      }
    }, {
      key: "render",
      value: function render() {
        return _react["default"].createElement(WrappedComponent, this.props);
      }
    }]);
    return WithGATrackerHOC;
  }(_react.Component);

  return WithGATrackerHOC;
};

exports.WithGATracker = WithGATracker;