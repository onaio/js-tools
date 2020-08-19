"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTable = void 0;

var renderTable = function renderTable(wrap) {
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  wrap.find('div.table .tr').forEach(function (tr, indx) {
    return expect(tr.text()).toMatchSnapshot("".concat(text, " tr index ").concat(indx));
  });
};

exports.renderTable = renderTable;