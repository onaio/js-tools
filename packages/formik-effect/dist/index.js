"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _formik = require("formik");

var _react = require("react");

function FormikEffect(props) {
  var formik = props.formik,
      onChange = props.onChange;
  var ref = (0, _react.useRef)(formik);
  (0, _react.useEffect)(function () {
    onChange(ref.current, formik);
    ref.current = formik;
  }, [formik]);
  return null;
}

var ConnectedFormikEffect = (0, _formik.connect)(FormikEffect);
var _default = ConnectedFormikEffect;
exports["default"] = _default;