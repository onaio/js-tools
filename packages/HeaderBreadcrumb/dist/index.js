"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var React = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactstrap = require("reactstrap");

require("./headerbreadcrumb.css");

var HeaderBreadcrumb = function (_React$Component) {
  (0, _inherits2["default"])(HeaderBreadcrumb, _React$Component);

  function HeaderBreadcrumb(props) {
    (0, _classCallCheck2["default"])(this, HeaderBreadcrumb);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HeaderBreadcrumb).call(this, props));
  }

  (0, _createClass2["default"])(HeaderBreadcrumb, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          currentPage = _this$props.currentPage,
          pages = _this$props.pages;
      var linkList = pages.map(function (page, key) {
        var breadCrumbItem;

        if (page.url && page.url.trim()) {
          breadCrumbItem = React.createElement(_reactRouterDom.Link, {
            to: page.url,
            key: key
          }, page.label);
        } else {
          breadCrumbItem = page.label;
        }

        return React.createElement(_reactstrap.BreadcrumbItem, {
          key: key
        }, breadCrumbItem);
      });
      return React.createElement("div", null, React.createElement(_reactstrap.Breadcrumb, {
        className: "reveal-breadcrumb"
      }, linkList, React.createElement(_reactstrap.BreadcrumbItem, {
        active: true
      }, currentPage.label)));
    }
  }]);
  return HeaderBreadcrumb;
}(React.Component);

var _default = HeaderBreadcrumb;
exports["default"] = _default;