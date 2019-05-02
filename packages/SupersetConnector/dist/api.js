"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.API = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _papaparse = require("papaparse");

function parseCSV(text, config) {
  return (0, _papaparse.parse)(text, config || {
    header: true,
    skipEmptyLines: true
  }).data;
}

var apiMap = {
  slice: 'superset/slice_json'
};

var apiHeaders = function apiHeaders(config) {
  var headers = new Headers();
  if (!config) return headers;
  if (config.mimeType) headers.append('Content-Type', config.mimeType);
  return headers;
};

var apiRequest = function apiRequest(config, headers) {
  var base = config.base || 'http://localhost:8088/';
  var apiPath = "".concat(base).concat(apiMap[config.endpoint] || '');
  var reqConfig = {
    method: config.method || 'GET',
    credentials: config.credentials || 'include'
  };
  if (headers) reqConfig.headers = headers;
  if (config.extraPath) apiPath = "".concat(apiPath, "/").concat(config.extraPath);
  if (config.params) apiPath = "".concat(apiPath, "?").concat(config.params);
  return new Request(apiPath, reqConfig);
};

var fetchAPI = function fetchAPI(config) {
  return fetch(apiRequest(config, apiHeaders(config)));
};

var API = function API() {
  (0, _classCallCheck2.default)(this, API);
  var self = this;

  this.doFetch = function () {
    var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(config) {
      var callback,
          _args = arguments;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              callback = _args.length > 1 && _args[1] !== undefined ? _args[1] : function (res) {
                return res;
              };
              return _context.abrupt("return", fetchAPI(config).catch(function (err) {
                return callback(err);
              }).then(function (res) {
                var parser;

                switch (config.mimeType) {
                  case 'text/csv':
                    parser = 'text';
                    break;

                  case 'image/jpeg':
                    parser = 'blob';
                    break;

                  default:
                    parser = 'json';
                }

                return res[parser]().then(function (parsed) {
                  if (config.mimeType === 'text/csv') return {
                    user: parseCSV(parsed)
                  };
                  return parsed;
                }).catch(function (err) {
                  return callback && callback(err) || {
                    res: res,
                    err: err
                  };
                }).then(function (user) {
                  return callback && callback(user) || {
                    res: res,
                    user: user
                  };
                });
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.deferedFetch = function (config, apiCallback, qCallback) {
    return self.doFetch(config, apiCallback).then(function (data) {
      return qCallback(null, data);
    }).catch(function (err) {
      return qCallback(err, null);
    });
  };
};

exports.API = API;
var _default = API;
exports.default = _default;